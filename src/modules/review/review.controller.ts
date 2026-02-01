import { RequestHandler } from "express";
import { reviewService } from "./review.service";

const createReview: RequestHandler = async (req, res) => {
  try {
    const result = await reviewService.createReviewInDB(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const reviewController = {
  createReview,
};