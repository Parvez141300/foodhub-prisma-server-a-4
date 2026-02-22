import { Meal } from "../../../generated/prisma/client"
import { MealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"

const getAllOrSearchMealFromDB = async ({ search, page, limit, skip, sort_by, sort_order }: { search: string | undefined, page: number, limit: number, skip: number, sort_by: string, sort_order: string }) => {
    const addCondition: MealWhereInput[] = [];
    if (search) {
        addCondition.push({
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
        });
    }
    const safeSortOrder = sort_order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    const result = await prisma.meal.findMany({
        skip: skip,
        take: limit,
        where: {
            AND: addCondition
        },
        orderBy: {
            [sort_by]: safeSortOrder,
        },
        include: {
            category: {
                select: {
                    name: true
                }
            }
        },
    });

    const totalItems = await prisma.meal.count({
        where: {
            AND: addCondition
        }
    });

    return {
        data: result,
        pagination: {
            totalItems,
            currentPage: page,
            limit: limit,
            totalPages: Math.ceil(totalItems / limit),
        }
    };
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
    // console.log(payload);
    const result = await prisma.meal.create({
        data: {
            ...payload,
            stock: Number(payload?.stock),
            price: Number(payload?.price),
        },
    });
    return result;
}

const updateMealByIdInDB = async ({ mealId, payload }: { mealId: string, payload: Meal}) => {
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
            ...payload,
            price: Number(payload?.price),
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