
import { prisma } from "../../lib/prisma";

type CreateOrderPayloadType = {
    user_id: string;
    orderItems: {
        meal_id: string,
        quantity: number
    }[]
}

const getUserOrdersFromDB = async (user_id: string) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: user_id
        },
        select: {
            id: true,
        }
    });
    if (userData?.id !== user_id) {
        return { message: "this user is not valid" }
    };

    const result = await prisma.order.findMany({
        where: {
            user_id: user_id,
        },
        include: {
            orderItems: true,
        }
    });

    return result;
}

const getOrderDetailsFromDB = async (order_id: string) => {
    const result = await prisma.order.findUnique({
        where: {
            id: order_id
        },
        include: {
            orderItems: true,
            user: true,
        }
    });
    return result;
}

const createOrderInDB = async (payload: CreateOrderPayloadType) => {
    // find user
    const userData = await prisma.user.findUnique({
        where: { id: payload.user_id },
        select: { id: true },
    });
    // check if user is valid or not
    if (!userData?.id) {
        return { message: "User not found to create order" };
    }

    // find meals data
    const meals = await prisma.meal.findMany({
        where: {
            id: {
                in: payload.orderItems.map(item => item.meal_id),
            }
        }
    });

    // total price calculation by quantity
    let total_price = 0;
    payload.orderItems.forEach(item => {
        const meal = meals.find(m => m.id === item.meal_id);
        if (meal?.id) {
            total_price = total_price + (meal.price * item.quantity);
        }
    });

    // create order and orderItems by transaction
    const result = prisma.$transaction(async (tx) => {
        // create order
        const order = await tx.order.create({
            data: {
                user_id: payload.user_id,
                total_price: total_price,
            }
        });
        // order items array
        const orderItemData = payload.orderItems.map(item => (
            {
                order_id: order?.id,
                meal_id: item?.meal_id,
                quantity: item?.quantity,
            }
        ));
        // create order items
        await tx.orderItem.createMany({
            data: orderItemData,
        });

        return order;
    });

    return result;
}

export const orderService = {
    getUserOrdersFromDB,
    getOrderDetailsFromDB,
    createOrderInDB,
};