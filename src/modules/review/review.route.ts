import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();

router.get("/reviews/:mealId", reviewController.getAllReviewByMealId);
router.post("/reviews", reviewController.createReview);

export const reviewRouter = router;