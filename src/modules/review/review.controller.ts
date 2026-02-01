import { RequestHandler } from "express";
import { reviewService } from "./review.service";

const getAllReviewByMealId: RequestHandler = async (req, res) => {
    try {
        const { meaId } = req.params;
        const result = await reviewService.getAllReviewByMealIdFromDB(meaId as string);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const createReview: RequestHandler = async (req, res) => {
    try {
        const result = await reviewService.createReviewInDB(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const reviewController = {
    getAllReviewByMealId,
    createReview,
};