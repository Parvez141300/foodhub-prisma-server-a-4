import { Profile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getUserProfileFromDB = async (userId: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            profile: true,
        }
    });
    if (!result) {
        throw new Error("User not found");
    }
    else {
        return result;
    }
}

const updateOrInsertProfileInDB = async (paylaod: Profile) => {
    const { id, created_at, updated_at, user_id, ...rest_data } = paylaod;

    const userData = await prisma.user.findUnique({
        where: {
            id: user_id,
        }
    });
    if (!userData) {
        return { message: "User not found" };
    }

    const result = await prisma.profile.upsert({
        where: {
            user_id: user_id,
        },
        update: {
            ...rest_data,
        },
        create: {
            user_id: user_id,
            ...rest_data,
        }
    });

    return result;
}

export const profileService = {
    getUserProfileFromDB,
    updateOrInsertProfileInDB,
};