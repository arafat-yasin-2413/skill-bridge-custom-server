import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
    // console.log("create user controller ...: ", req.body);
    try{
        const result = await authService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully.",
            data: result,
        });
    }   
    catch(error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

const userLogin = async (req: Request, res: Response) => {
    try{
        const result = await authService.userLogin(req.body);
        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully.",
            data: result,
        });
    }   
    catch(error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

export const authController = {
    createUser,
    userLogin,
};
