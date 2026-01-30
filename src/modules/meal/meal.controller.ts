
import { RequestHandler } from "express";
import { mealService } from "./meal.service"

const createMeal: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await mealService.createMealIntoDB(payload);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const mealController = {
    createMeal,
}