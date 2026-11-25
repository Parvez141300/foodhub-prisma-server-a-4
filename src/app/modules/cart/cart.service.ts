import { MealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IGetAllOrQueryUserCartPayload } from "./cart.interface";

const getAllOrQueryUserCartFromDB = async (userId: string, payload: IGetAllOrQueryUserCartPayload) => {
    const { search, page, limit, skip, sort_by, sort_order } = payload;

    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    if (!userData) {
        throw new Error("This user not found");
        return;
    }

    const mealSearch: MealWhereInput = search
        ? { title: { contains: search, mode: 'insensitive' } }
        : {};

    const result = await prisma.cart.findFirst({
        where: {
            user_id: userId,
        },
        include: {
            cartItems: {
                where: Object.keys(mealSearch).length ? { meal: mealSearch } : {},
                take: limit,
                skip: skip,
                orderBy: {
                    [sort_by]: sort_order,
                },
                include: {
                    meal: {
                        include: {
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
                        }
                    }
                }
            },
        }
    });

    const cartCount = await prisma.cartItem.count({
        where: {
            cart: { user_id: userId },
        }
    });

    return {
        data: result,
        pagination: {
            page: page,
            limit: limit,
            total: cartCount,
            totalPage: Math.ceil(cartCount / limit),
        }
    };
}

const createCartInDB = async (payload: {
    user_id: string;
    meal_id: string;
    quantity: string;
}) => {
    const { user_id, meal_id, quantity } = payload;

    const isExistingUser = await prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!isExistingUser) {
        throw new Error("User not found");
        return;
    }

    const isExistMeal = await prisma.meal.findUnique({
        where: {
            id: meal_id,
        },
    });
    if (!isExistMeal) {
        throw new Error("Meal not found");
        return;
    }

    let cart = await prisma.cart.findUnique({
        where: {
            user_id: user_id,
        },
    });
    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                user_id: user_id,
            },
        })
    }

    let cartItem = await prisma.cartItem.findUnique({
        where: {
            cart_id_meal_id: {
                cart_id: cart.id,
                meal_id: meal_id,
            }
        }
    });
    if (cartItem) {
        const result = await prisma.cartItem.update({
            where: {
                cart_id_meal_id: {
                    cart_id: cart.id,
                    meal_id: meal_id,
                }
            },
            data: {
                quantity: Number(cartItem.quantity) + Number(quantity),
            }
        });

        return result;
    }
    else {
        const result = await prisma.cartItem.create({
            data: {
                cart_id: cart.id,
                meal_id: meal_id,
                quantity: Number(quantity),
            }
        });

        return result;
    }
}

const deleteCartItemFromDB = async ({ cartId, user_id, meal_id }: { cartId: string, user_id: string, meal_id: string }) => {
    const isExistingUser = await prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!isExistingUser) {
        throw new Error("User not found")
        return;
    }

    const isExistingCart = await prisma.cart.findUnique({
        where: {
            id: cartId,
        },
    });
    if (!isExistingCart) {
        throw new Error("Cart not found")
        return;
    }

    const isExistMeal = await prisma.meal.findUnique({
        where: {
            id: meal_id,
        }
    });
    if (!isExistMeal) {
        throw new Error("Meal not found");
        return;
    }

    const deleteCartItem = await prisma.cartItem.delete({
        where: {
            cart_id_meal_id: {
                cart_id: cartId,
                meal_id: meal_id,
            }
        }
    });

    return deleteCartItem;
}

export const cartService = {
    getAllOrQueryUserCartFromDB,
    createCartInDB,
    deleteCartItemFromDB,
}