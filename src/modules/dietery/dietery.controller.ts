import { RequestHandler } from "express";
import { dieteryService } from "./dietery.service";

const createDietery: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await dieteryService.createDieteryInDB(payload);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const dieteryController = {
    createDietery,
}