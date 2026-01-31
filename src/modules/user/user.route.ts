import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/admin/users", userController.getAllOrSearchUser);

export const userRouter = router