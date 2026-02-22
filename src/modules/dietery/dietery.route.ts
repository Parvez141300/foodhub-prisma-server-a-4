import { Router } from "express";
import { dieteryController } from "./dietery.controller";

const router = Router();

router.post("/dieteries", dieteryController.createDietery);

export const dieteryRouter = router;