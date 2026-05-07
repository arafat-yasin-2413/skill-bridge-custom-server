import { prisma } from "../../../lib/prisma";

const createCategory = async (payload: { name: string }) => {
    const result = await prisma.category.create({
        data: {
            ...payload,
        },
    });

    return result;
};

const getAllCategory = async () => {
    return await prisma.category.findMany();
};

export const categoryServices = {
    createCategory,
    getAllCategory,
};
