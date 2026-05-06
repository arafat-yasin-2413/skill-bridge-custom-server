import { Request, Response } from "express";
import { tutorServices } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response) => {
    // console.log("create tutor profile controller ...: ", req.body);
    // console.log('Logged in user er ID: ', req?.user?.id);
    const loggedInUserId = req?.user?.id;
    try {
        const result = await tutorServices.createTutorProfile(
            req.body,
            loggedInUserId,
        );
        return res.status(201).json({
            success: true,
            message: "Tutor Profile Created Successfully.",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllTutorProfiles = async (req: Request, res: Response) => {
    try {
        const result = await tutorServices.getAllTutorProfiles();
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Tutor Profile Has Been Created Yet.",
                data: result,
                length: result.length,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Retrived all tutor profiles successfully",
                data: result,
                length: result.length,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const tutorController = {
    createTutorProfile,
    getAllTutorProfiles,
};
