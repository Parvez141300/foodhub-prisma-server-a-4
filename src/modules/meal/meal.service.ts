import { Meal } from "../../../generated/prisma/client"
import { MealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"

const getAllOrQueryMealFromDB = async (
    {
        search, category, cuisine, dietery, minPrice, maxPrice, page, limit, skip, sort_by, sort_order
    }
        :
        {
            search: string | undefined, category: string | undefined, cuisine: string | undefined, dietery: string | undefined, minPrice: number | undefined, maxPrice: number | undefined, page: number, limit: number, skip: number, sort_by: string, sort_order: string
        }
) => {
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
    if (category) {
        addCondition.push({
            category_id: {
                in: category.split(","),
            }
        })
    }
    if (cuisine) {
        addCondition.push({
            cuisine_id: {
                in: cuisine.split(","),
            }
        })
    }
    if (dietery) {
        addCondition.push({
            dietery_id: {
                in: dietery.split(","),
            }
        })
    }

    if (minPrice || maxPrice) {
        addCondition.push({
            price: {
                gte: minPrice || 0,
                lte: maxPrice || 10000,
            }
        })
    }

    const safeSortOrder = sort_order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    const result = await prisma.meal.findMany({
        skip: skip,
        take: limit,
        where: {
            AND: addCondition,
            is_available: true,
        },
        orderBy: {
            [sort_by]: safeSortOrder,
        },
        include: {
            provider: true,
            category: {
                select: {
                    id: true,
                    name: true
                }
            },
            cuisine: {
                select: {
                    id: true,
                    name: true
                }
            },
            dietery: {
                select: {
                    id: true,
                    name: true
                }
            },
        },
    });

    const totalItems = await prisma.meal.count({
        where: {
            AND: addCondition,
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
            category: true,
            cuisine: true,
            dietery: true,
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

const updateMealByIdInDB = async ({ mealId, payload }: {
    mealId: string, payload: {
        title: string,
        description: string,
        image_url: string,
        price: string,
        stock: string,
        is_available: string,
        category_id: string,
        cuisine_id: string,
        dietery_id: string,
    }
}) => {
    const mealData = await prisma.meal.findUnique({
        where: {
            id: mealId
        },
        select: {
            id: true,
            provider_id: true,
            category_id: true,
            cuisine_id: true,
            dietery_id: true,
        }
    });
    if (!mealData?.id) {
        throw new Error("To update Meal this meal does not exist");
        return;
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
        throw new Error("creator is not valid to update meal's data");
        return;
    }

    await prisma.category.findUniqueOrThrow({
        where: {
            id: payload.category_id,
        }
    });
    await prisma.cuisine.findUniqueOrThrow({
        where: {
            id: payload.cuisine_id,
        }
    });
    await prisma.dietery.findUniqueOrThrow({
        where: {
            id: payload.dietery_id,
        }
    });

    const result = await prisma.meal.update({
        where: {
            id: mealId
        },
        data: {
            title: payload.title,
            description: payload.description,
            image_url: payload.image_url,
            stock: Number(payload?.stock),
            price: Number(payload?.price),
            is_available: Boolean(payload?.is_available),
            category: { connect: { id: payload.category_id } },
            cuisine: { connect: { id: payload.cuisine_id } },
            dietery: { connect: { id: payload.dietery_id } },
        },
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
    getAllOrQueryMealFromDB,
    getMealByIdFromDB,
    createMealIntoDB,
    updateMealByIdInDB,
    deleteMealByIdInDB,
}