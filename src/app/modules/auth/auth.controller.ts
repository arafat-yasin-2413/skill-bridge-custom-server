import { Request, Response } from "express";
import { authService } from "./auth.service";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../../../config";

const createUser = async (req: Request, res: Response) => {
    console.log("create user controller. Body from frontend...: ", req.body);
    // console.log('type of body: ', typeof(req.body));
    try {
        const result = await authService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully.",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const userLogin = async (req: Request, res: Response) => {
    const isProduction = config.nodeEnv === "production";
    try {
        const result = await authService.userLogin(req.body);

        console.log('Body from frontend for login: ', req.body);
        
        // console.log('Result.token after login : ', result.token);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none": "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully.",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const { email, name, image, sub, role } = req.body;
        // sub = google provider id

        // step 1 : securing the roles here
        const allowedRoles = ["STUDENT", "TUTOR"];
        let safeRole: "STUDENT" | "TUTOR" = "STUDENT";

        if (allowedRoles.includes(role)) {
            safeRole = role;
        }

        // step 2 : checking user existence
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // existing non-google user
        if(user && user.provider !== "google") {
            return res.status(400).json({
                success: false,
                message: "This account already exists with email/password login.",
            });
        }

        // create google user 
        if (!user) {
            // now, create new user
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: null,
                    role: safeRole,
                    provider: "google",
                    providerId: sub,
                },
            });
        }

        // JWT generate (same as login function)
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
            },
            config.jwtSecret as string,
            { expiresIn: "7d" },
        );

        // return res.json({ token, user });
        return res.status(200).json({
            success: true,
            message: "Google authentication successfull",
            token, 
            user,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Google login attempt failed!",
            errorMessage: error.message,
        });
    }
};

export const authController = {
    createUser,
    userLogin,
};
