import { RequestHandler } from "express";
import { CartService } from "./cart.service";

const createCart: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await CartService.createCartInDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const cartController = {
    createCart,
}