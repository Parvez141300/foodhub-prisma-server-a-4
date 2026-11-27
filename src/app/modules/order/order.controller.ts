import { RequestHandler } from "express";
import { orderService } from "./order.service";
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";

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

const getAllOrQueryUserOrders: RequestHandler = async (req, res) => {
    try {
        const userId = req.user!.id;
        const search = req.query.search ? req.query.search : "";
        const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);
        const result = await orderService.getAllOrQueryUserOrdersFromDB(
            userId as string,
            {
                search: search as string,
                page,
                limit,
                skip,
                sort_by,
                sort_order,
            });

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

const updateUserPendingOrderStatus: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { order_status } = req.body;
        const result = await orderService.updateUserPendingOrderStatusInDB(orderId as string, order_status);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const orderController = {
    getAllOrders,
    getPoriderOrders,
    getAllOrQueryUserOrders,
    getOrderDetails,
    createOrder,
    updateOrderStatus,
    updateUserPendingOrderStatus,
};