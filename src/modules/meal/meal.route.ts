import { Router } from "express";
import { mealController } from "./meal.controller";


const router = Router();

router.post("/provider/meals", mealController.createMeal)

export const mealRouter = router;