import { Router } from "express";
import { dietaryController } from "./dietery.controller";

const router = Router();

router.get("/dietaries", dietaryController.getAllDietary);
router.post("/dietaries", dietaryController.createDietary);
router.delete("/dietaries/:dietaryId", dietaryController.deleteDietary);

export const dietaryRouter = router;