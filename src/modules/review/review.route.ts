import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/reviews", reviewController.createReview);

export const reviewRouter = router;