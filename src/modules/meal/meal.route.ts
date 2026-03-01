import { Router } from "express";
import { mealController } from "./meal.controller";
import authMiddleware, { UserRole } from "../../middleware/authMiddleware";


const router = Router();

router.get("/meals", mealController.getAllOrQueryMeal);
router.get("/meals/:mealId", mealController.getMealById);
router.get("/provider/meals/:providerId", mealController.getMealsByProviderId);
router.post("/provider/meals", authMiddleware(UserRole.PROVIDER), mealController.createMeal);
router.patch("/provider/meals/:mealId", authMiddleware(UserRole.PROVIDER), mealController.updateMealById);
router.delete("/provider/meals/:mealId", authMiddleware(UserRole.PROVIDER), mealController.deleteMealById);

export const mealRouter = router;