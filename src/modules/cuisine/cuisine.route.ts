import { Router } from "express";
import { cuisineController } from "./cuisine.controller";

const router = Router();

router.post("/cuisines", cuisineController.createCuisine);
router.delete("/cuisines/:cuisineId", cuisineController.deleteCuisine);

export const cuisineRouter = router;