import { RequestHandler } from "express";
import { dieteryService } from "./dietery.service";

const createDietery: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await dieteryService.createDieteryInDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const deleteDietery: RequestHandler = async (req, res) => {
    try {
        const { dieteryId } = req.params;
        const dietery_id = dieteryId as string;
        const result = await dieteryService.deleteDieteryFromDB(dietery_id);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const dieteryController = {
    createDietery,
    deleteDietery,
}