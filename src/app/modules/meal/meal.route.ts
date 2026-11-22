import { Router } from "express";
import { mealController } from "./meal.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router();

router.get("/meals", mealController.getAllOrQueryMeal);
router.get("/meals/featured", mealController.getAllFeaturedMeals);
router.get("/meals/:mealId", mealController.getMealById);
router.get("/provider/meals/:providerId", mealController.getMealsByProviderId);
router.post("/provider/meals", authMiddleware(UserRole.PROVIDER), mealController.createMeal);
router.patch("/provider/meals/:mealId", authMiddleware(UserRole.PROVIDER), mealController.updateMealById);
router.delete("/provider/meals/:mealId", authMiddleware(UserRole.PROVIDER), mealController.deleteMealById);

export const mealRouter = router;