import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    console.log("create user controller ...");
};

export const AuthController = {
    createUser,
};
