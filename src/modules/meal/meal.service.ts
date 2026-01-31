import { Meal } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getAllOrSearchMealFromDB = async ({ search }: { search: string | undefined }) => {

    const result = await prisma.meal.findMany({
        where: search ? {
            OR: [
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
                {
                    description: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
                {
                    category: {
                        name: {
                            contains: search as string,
                            mode: "insensitive"
                        }
                    },
                },
            ]
        } : {},
        include: {
            category: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    });

    return result;
}

const getMealByIdFromDB = async (mealId: string) => {
    const result = await prisma.meal.findUnique({
        where: {
            id: mealId
        },
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    return result;
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
    getMealByIdFromDB,
    createMealIntoDB,
}