import { Router } from "express";
import { dieteryController } from "./dietery.controller";

const router = Router();

router.get("/dieteries", dieteryController.getAllDietery);
router.post("/dieteries", dieteryController.createDietery);
router.delete("/dieteries/:dieteryId", dieteryController.deleteDietery);

export const dieteryRouter = router;