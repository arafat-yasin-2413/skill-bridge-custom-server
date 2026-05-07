import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUser();
        // console.log(result);
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Getting all user request failed.",
            errorDetails: error,
        });
    }
};

export const userController = {
    getAllUser,
};
