import { Cart } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";

const createCartInDB = async (payload: Cart) => {
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

export const CartService = {
    createCartInDB,
}