import { RequestHandler } from "express";
import { dietaryService } from "./dietery.service";

const getAllDietary: RequestHandler = async (req, res) => {
    try {
        const result = await dietaryService.getAllDietaryFromDB();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const createDietary: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await dietaryService.createDietaryInDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const deleteDietary: RequestHandler = async (req, res) => {
    try {
        const { dietaryId } = req.params;
        const dietary_id = dietaryId as string;
        const result = await dietaryService.deleteDieteryFromDB(dietary_id);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const dietaryController = {
    getAllDietary,
    createDietary,
    deleteDietary,
}