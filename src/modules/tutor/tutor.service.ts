import { TutorStatus, UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createTutorProfile = async (
    payload: {
        categoryId: string;
        status: TutorStatus;
    },
    userId: string,
) => {
    // console.log("create tutor profile service...: ", payload);

    const existingTutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });

    if (existingTutorProfile) {
        throw new Error(
            "Tutor Profile already exists. Try with different Credentials.",
        );
    }

    const result = await prisma.tutorProfile.create({
        data: {
            ...payload,
            userId,
        },
    });

    return result;
};

const getAllTutorProfiles = async () => {
    return await prisma.tutorProfile.findMany();
};

export const tutorServices = {
    createTutorProfile,
    getAllTutorProfiles,
};
