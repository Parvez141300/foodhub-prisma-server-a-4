import { RequestHandler } from "express";
import { cartService } from "./cart.service";

const getUserCart: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await cartService.getUserCartFromDB(userId as string);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

const createCart: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await cartService.createCartInDB(payload);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

const deleteCartItem: RequestHandler = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { user_id, meal_id } = req.body;

        const result = await cartService.deleteCartItemFromDB({ cartId: cartId as string, user_id, meal_id });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const cartController = {
    getUserCart,
    createCart,
    deleteCartItem,
}