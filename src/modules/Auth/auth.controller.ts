import { Request, Response } from "express";
import { authService } from "./auth.service";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (req: Request, res: Response) => {
    // console.log("create user controller ...: ", req.body);
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
    try {
        const result = await authService.userLogin(req.body);
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
        const { email, name, image, sub } = req.body;
        // sub = google provider id

        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            // now, create new user
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: null,
                    role: "STUDENT",
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

        return res.json({ token, user });
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
