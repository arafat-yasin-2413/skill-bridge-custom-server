import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryServices.getAllCategory();

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "There is not category yet. Create Some.",
                data: result,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Category retrived successfully.",
                data: result,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const categoryControllers = {
    createCategory,
    getAllCategory,
};
