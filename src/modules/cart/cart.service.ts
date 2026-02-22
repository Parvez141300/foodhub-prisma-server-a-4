import { prisma } from "../../lib/prisma";

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
    if(!isExistMeal){
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
    createCartInDB,
    deleteCartItemFromDB,
}