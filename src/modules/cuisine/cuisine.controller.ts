import { RequestHandler } from "express";
import { cuisineService } from "./cuisine.service";

const getAllCuisine: RequestHandler = async (req, res) => {
    try {
        const result = await cuisineService.getAllCuisineFromDB();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const createCuisine: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await cuisineService.createCuisineInDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const deleteCuisine: RequestHandler = async (req, res) => {
    try {
        const { cuisineId } = req.params;
        const cuisine_id = cuisineId as string;
        const result = await cuisineService.deleteCuisineFromDB(cuisine_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const cuisineController = {
    getAllCuisine,
    createCuisine,
    deleteCuisine,
}

