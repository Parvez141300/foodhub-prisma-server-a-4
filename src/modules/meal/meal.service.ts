import { Meal } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getAllOrSearchMealFromDB = async () => {

}

const createMealIntoDB = async (payload: Meal) => {
    console.log(payload);
    const result = await prisma.meal.create({
        data: payload,
    });
    return result;
}

export const mealService = {
    getAllOrSearchMealFromDB,
    createMealIntoDB,
}