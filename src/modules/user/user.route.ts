import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/providers", userController.getAllProvider);
router.get("/providers/:providerId", userController.getProviderWithMenu);
router.get("/admin/users", userController.getAllOrSearchUser);
router.patch("/admin/users/:userId", userController.updateUserStatus);

export const userRouter = router