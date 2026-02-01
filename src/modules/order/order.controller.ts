import { RequestHandler } from "express";
import { orderService } from "./order.service";

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
  createOrder,
};