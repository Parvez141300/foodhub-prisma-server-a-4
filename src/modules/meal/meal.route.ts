import { Router } from "express";
import { mealController } from "./meal.controller";
import authMiddleware, { UserRole } from "../../middleware/authMiddleware";


const router = Router();

router.get("/meals", authMiddleware(UserRole.CUSTOMER), mealController.getAllOrSearchMeal);
router.get("/meals/:mealId", mealController.getMealById);
router.post("/provider/meals", mealController.createMeal);
router.patch("/provider/meals/:mealId", mealController.updateMealById);
router.delete("/provider/meals/:mealId", mealController.deleteMealById);

export const mealRouter = router;