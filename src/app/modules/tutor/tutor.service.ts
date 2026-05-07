import { TutorStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";

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

const getSingleTutorProfile = async(profileId :string) =>{
    // console.log('get single profile service : ', profileId);

    const existingTutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            id: profileId
        }
    });

    if(!existingTutorProfile) {
        throw new Error("There is no tutor profile in this ID.");
    }

    return existingTutorProfile;
}

export const tutorServices = {
    createTutorProfile,
    getAllTutorProfiles,
    getSingleTutorProfile,
};
