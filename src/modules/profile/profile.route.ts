import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.patch("/profiles", profileController.updateOrInsertProfile);

export const profileRouter = router;