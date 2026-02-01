import { RequestHandler } from "express";
import { orderService } from "./order.service";

const getUserOrders: RequestHandler = async (req, res) => {
    try {
        const { user_id } = req.query;
        const result = await orderService.getUserOrdersFromDB(user_id as string)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const createOrder: RequestHandler = async (req, res) => {
    try {
        const orderData = req.body;
        const result = await orderService.createOrderInDB(orderData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const orderController = {
    getUserOrders,
    createOrder,
};