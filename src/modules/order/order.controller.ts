import { RequestHandler } from "express";
import { orderService } from "./order.service";

const getAllOrders: RequestHandler = async (req, res) => {
    try {
        const result = await orderService.getAllOrdersFromDB();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const getPoriderOrders: RequestHandler = async (req, res) => {
    try {
        const { providerId } = req.params;
        const result = await orderService.getPoriderOrdersFromDB(providerId as string);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const getUserOrders: RequestHandler = async (req, res) => {
    try {
        const { user_id } = req.query;
        const result = await orderService.getUserOrdersFromDB(user_id as string)
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const getOrderDetails: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await orderService.getOrderDetailsFromDB(orderId as string);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const createOrder: RequestHandler = async (req, res) => {
    try {
        const orderData = req.body;
        const result = await orderService.createOrderInDB(orderData);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const updateOrderStatus: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { provider_id, order_status } = req.body;
        const result = await orderService.updateOrderStatusInDB({ order_id: orderId as string, provider_id, order_status });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const orderController = {
    getAllOrders,
    getPoriderOrders,
    getUserOrders,
    getOrderDetails,
    createOrder,
    updateOrderStatus,
};