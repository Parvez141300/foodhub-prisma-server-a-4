import { RequestHandler } from "express";
import { cuisineService } from "./cuisine.service";

const createCuisine: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await cuisineService.createCuisineInDB(payload);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const cuisineController = {
    createCuisine,
}

