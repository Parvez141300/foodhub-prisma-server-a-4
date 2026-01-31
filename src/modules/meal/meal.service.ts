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

const updateMealByIdInDB = async ({ mealId, payload }: { mealId: string, payload: Record<string, string> }) => {
    const mealData = await prisma.meal.findUnique({
        where: {
            id: mealId
        },
        select: {
            id: true,
            provider_id: true,
        }
    });
    if (!mealData?.id) {
        return { message: "To update Meal this meal does not exist" };
    }

    const providerData = await prisma.user.findUnique({
        where: {
            id: mealData?.provider_id as string,
        },
        select: {
            id: true,
        }
    });
    if (providerData?.id !== mealData.provider_id) {
        return { message: "creator is not valid to update meal's data" };
    }

    const result = await prisma.meal.update({
        where: {
            id: mealId
        },
        data: {
            ...payload
        },
        select: {
            id: true,
            title: true,
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
    return result;
}

const deleteMealByIdInDB = async ({ mealId }: { mealId: string }) => {

    const mealData = await prisma.meal.findUnique({
        where: {
            id: mealId
        },
        select: {
            id: true,
            provider_id: true,
        }
    });

    if (!mealData?.id) {
        return { message: "To delete Meal this meal does not exist" };
    }

    const providerData = await prisma.user.findUnique({
        where: {
            id: mealData?.provider_id as string,
        },
        select: {
            id: true,
        }
    });

    if (providerData?.id !== mealData.provider_id) {
        return { message: "creator is not valid to delete meal's data" };
    }

    const result = await prisma.meal.delete({
        where: {
            id: mealId
        },
        select: {
            id: true,
            title: true,
            category: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
    return result;
}

export const mealService = {
    getAllOrSearchMealFromDB,
    getMealByIdFromDB,
    createMealIntoDB,
    updateMealByIdInDB,
    deleteMealByIdInDB,
}