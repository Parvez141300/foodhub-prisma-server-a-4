import { Cuisine } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";

const getAllCuisineFromDB = async () => {
    const result = await prisma.cuisine.findMany();
    return result;
}

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

const deleteCuisineFromDB = async (cuisine_id: string) => {
    const isExistCuisine = await prisma.cuisine.findUnique({
        where: {
            id: cuisine_id
        }
    });

    if(!isExistCuisine){
        throw new Error("This cuisine does not exists");
        return;
    }

    const result = await prisma.cuisine.delete({
        where: {
            id: cuisine_id,
        }
    });

    return result;
}

export const cuisineService = {
    getAllCuisineFromDB,
    createCuisineInDB,
    deleteCuisineFromDB,
}