import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

const createUser = async (payload: {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}) => {
    console.log("create user service...: ", payload);

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

export const authService = {
    createUser,
};
