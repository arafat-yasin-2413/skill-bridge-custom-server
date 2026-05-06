import config from "../../config";
import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (payload: {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}) => {
    // console.log("create user service...: ", payload);

    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (existingUser) {
        throw new Error("User already exists. Please Login.");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });

    const { password, ...remainingResult } = result;
    return remainingResult;
};

const userLogin = async (payload: { email: string; password: string }) => {
    const isExist = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!isExist) {
        throw new Error(
            "User not found. Re-check your credentials. Or register yourself.",
        );
    }
    if (isExist.provider !== "credentials") {
        throw new Error(`Please login using ${isExist.provider}`);
    }

    if (!isExist.password) {
        throw new Error("Password not set for this account.");
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        isExist.password as string,
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid password. Please provide correct password.");
    }

    const userDataInsideJwtToken = {
        id: isExist.id,
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
        status: isExist.status,
    };

    const token = jwt.sign(userDataInsideJwtToken, config.jwtSecret as string, {
        expiresIn: "7d",
    });

    const { password, ...remainingUserData } = isExist;

    return {
        token,
        userData: remainingUserData,
    };
};

export const authService = {
    createUser,
    userLogin,
};
