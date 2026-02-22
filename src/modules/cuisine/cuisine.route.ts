import { Router } from "express";
import { cuisineController } from "./cuisine.controller";

const router = Router();

router.post("/cuisines", cuisineController.createCuisine);

export const cuisineRouter = router;