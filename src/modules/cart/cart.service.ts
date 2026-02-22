import { Cart } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";

const createCartInDB = async (payload: Cart) => {
    const isExistingUser = await prisma.user.findUnique({
        where: {
            id: payload.user_id,
        },
    });
    if (!isExistingUser) {
        return { message: "User not found" };
    }
    const isExistingCart = await prisma.cart.findUnique({
        where: {
            id: payload.id,
        },
    });
    if (isExistingCart) {
        return { message: "Cart already exists" };
    }
    const result = await prisma.cart.create({
        data: payload,
    });
    return result;
}

const deleteCartFromDB = async ({ cartId, user_id }: { cartId: string, user_id: string }) => {
    const isExistingUser = await prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!isExistingUser) {
        return { message: "User not found" };
    }
    const isExistingCart = await prisma.cart.findUnique({
        where: {
            id: cartId,
        },
    });
    if (!isExistingCart) {
        return { message: "Cart not found" };
    }
    const result = await prisma.cart.delete({
        where: {
            id: cartId
        }
    });

    return result;
}

export const cartService = {
    createCartInDB,
    deleteCartFromDB,
}