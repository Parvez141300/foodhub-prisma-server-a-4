import { Cuisine } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";

const createCuisineInDB = async (cuisineData: Cuisine) => {
    const existingCuisine = await prisma.cuisine.findUnique({
        where: {
            name: cuisineData.name,
        },
    });
    if (existingCuisine) {
        return { message: "Cuisine already exists" };
    }
    const result = await prisma.cuisine.create({
        data: cuisineData,
    });
    return result;
}

export const cuisineService = {
    createCuisineInDB,
}