import { Dietery } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createDieteryInDB = async (dietery: Dietery) => {
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

export const dieteryService = {
    createDieteryInDB,
}