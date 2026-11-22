import { Router } from "express";
import { reviewController } from "./review.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get("/reviews/:mealId", reviewController.getAllReviewByMealId);
router.post("/reviews", authMiddleware(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), reviewController.createReview);

export const reviewRouter = router;