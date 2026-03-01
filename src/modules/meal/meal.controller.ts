
import { RequestHandler } from "express";
import { mealService } from "./meal.service"
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";

const getAllOrQueryMeal: RequestHandler = async (req, res) => {
    try {
        const { search, category, cuisine, dietery, minPrice, maxPrice } = req.query;

        const searchString = typeof search === "string" ? search : undefined;
        const categoryString = typeof category === "string" ? category : undefined;
        const cuisineString = typeof cuisine === "string" ? cuisine : undefined;
        const dieteryString = typeof dietery === "string" ? dietery : undefined;
        const minP = minPrice ? Number(minPrice) : undefined;
        const maxP = maxPrice ? Number(maxPrice) : undefined;

        const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);

        const result = await mealService.getAllOrQueryMealFromDB({ search: searchString, category: categoryString, cuisine: cuisineString, dietery: dieteryString, minPrice: minP, maxPrice: maxP, page, limit, skip, sort_by, sort_order });
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

const getMealsByProviderId: RequestHandler = async (req, res) => {
    try {
        const { providerId } = req.params;
        const result = await mealService.getMealsByProviderIdFromDB(providerId as string);
        res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const createMeal: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await mealService.createMealIntoDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: error.message || "Internal server error" });
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
    getAllOrQueryMeal,
    getMealById,
    getMealsByProviderId,
    createMeal,
    updateMealById,
    deleteMealById,
}