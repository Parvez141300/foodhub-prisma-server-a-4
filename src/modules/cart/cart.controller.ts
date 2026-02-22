import { RequestHandler } from "express";
import { cartService } from "./cart.service";

const createCart: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await cartService.createCartInDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

const deleteCart: RequestHandler = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { user_id } = req.body;

        const result = await cartService.deleteCartFromDB({ cartId: cartId as string, user_id });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const cartController = {
    createCart,
    deleteCart,
}