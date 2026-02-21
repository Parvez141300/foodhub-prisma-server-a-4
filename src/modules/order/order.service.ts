
import { Order_Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type CreateOrderPayloadType = {
    user_id: string;

    name: string;
    phone: string;
    division: string;
    district: string;
    thana: string;
    area: string;
    street?: string;
    postal_code?: string;

    orderItems?: {
        meal_id: string,
        quantity: number,
    },
    cartItems?: {
        meal_id: string,
        quantity: number,
    }[],
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

    let meal: any = {};
    let total_price = 0;

    if (payload?.orderItems?.meal_id) {
        meal = await prisma.meal.findUnique({
            where: {
                id: payload.orderItems.meal_id,
            }
        });
        total_price = Number(meal?.price) * Number(payload.orderItems.quantity);
    }

    let meals: any = [];

    if (payload?.cartItems?.length) {
        // find meals data
        meals = await prisma.meal.findMany({
            where: {
                id: {
                    in: payload.cartItems.map(item => item.meal_id),
                }
            }
        });
        // total price calculation by quantity

        payload.cartItems.forEach(item => {
            const meal = meals.find((m: any) => m.id === item.meal_id);
            if (meal?.id) {
                total_price = total_price + (Number(meal.price) * Number(item.quantity));
            }
        });
    }


    // create order and orderItems by transaction
    const result = prisma.$transaction(async (tx) => {
        // create order
        const order = await tx.order.create({
            data: {
                user_id: payload.user_id,
                name: payload.name,
                phone: payload.phone,
                division: payload.division,
                district: payload.district,
                thana: payload.thana,
                area: payload.area,
                street: payload.street || "",
                postal_code: payload.postal_code || "",
                total_price: total_price,
            }
        });
        if (payload?.orderItems?.meal_id) {
            // create order item
            const orderItemData = {
                order_id: order?.id,
                meal_id: meal?.id,
                quantity: Number(payload?.orderItems.quantity),
            }
            // create order items
            await tx.orderItem.create({
                data: orderItemData
            });
        }
        if (payload?.cartItems?.length) {
            // order items array
            const cartItemData = payload.cartItems.map(item => (
                {
                    order_id: order?.id,
                    meal_id: item?.meal_id,
                    quantity: Number(item?.quantity),
                }
            ));
            // create order items
            await tx.orderItem.createMany({
                data: cartItemData,
            });
        }


        return order;
    });

    return result;
}

const updateOrderStatusInDB = async ({ order_id, provider_id, order_status }: { order_id: string, provider_id: string, order_status: Order_Status }) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: provider_id,
        }
    });

    if (userData?.role !== "PROVIDER" && !userData?.id) {
        return { message: "provider/creator is not valid to update order status" };
    }

    const result = await prisma.order.update({
        where: {
            id: order_id,
        },
        data: {
            order_status: order_status,
        }
    });

    return result;
}

export const orderService = {
    getUserOrdersFromDB,
    getOrderDetailsFromDB,
    createOrderInDB,
    updateOrderStatusInDB,
};