import { Dietery } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllDietaryFromDB = async () => {
    const result = await prisma.dietery.findMany({
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    });
    return result;
}

const createDietaryInDB = async (dietery: Dietery) => {
    const isExisting = await prisma.dietery.findUnique({
        where: {
            name: dietery.name,
        },
    });
    if (isExisting) {
        return { message: "Dietery already exists" };
    }
    const result = await prisma.dietery.create({
        data: dietery,
    });
    return result;
}

const deleteDieteryFromDB = async (dietery_id: string) => {
    const isExistDietery = await prisma.dietery.findUnique({
        where: {
            id: dietery_id
        }
    });
    if (!isExistDietery) {
        throw new Error("This dietery does not exists");
        return;
    }
    const result = await prisma.dietery.delete({
        where: {
            id: dietery_id
        }
    });

    return result;
}

export const dietaryService = {
    getAllDietaryFromDB,
    createDietaryInDB,
    deleteDieteryFromDB,
}