import { prisma } from "../../../lib/prisma";

const getAllUser = async () => {
    const result = await prisma.user.findMany();
    return result;
};

export const userService = {
    getAllUser,
};
