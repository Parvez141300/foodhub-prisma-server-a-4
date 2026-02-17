
import { RequestHandler } from "express";
import { mealService } from "./meal.service"
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";

const getAllOrSearchMeal: RequestHandler = async (req, res) => {
    try {
        const { search } = req.query;

        const searchString = typeof search === "string" ? search : undefined;

        const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);

        const result = await mealService.getAllOrSearchMealFromDB({ search: searchString, page, limit, skip, sort_by, sort_order });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMealById: RequestHandler = async (req, res) => {
    try {
        const { mealId } = req.params;

        const result = await mealService.getMealByIdFromDB(mealId as string);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const createMeal: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await mealService.createMealIntoDB(payload);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateMealById: RequestHandler = async (req, res) => {
    try {
        const { mealId } = req.params;
        const payload = req.body;
        const result = await mealService.updateMealByIdInDB({ mealId: mealId as string, payload });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteMealById: RequestHandler = async (req, res) => {
    try {
        const { mealId } = req.params;
        const result = await mealService.deleteMealByIdInDB({ mealId: mealId as string });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const mealController = {
    getAllOrSearchMeal,
    getMealById,
    createMeal,
    updateMealById,
    deleteMealById,
}