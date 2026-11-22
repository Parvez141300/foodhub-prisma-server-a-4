import { Router } from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get("/providers", userController.getAllProvider);
router.get("/providers/:providerId", userController.getProviderWithMenu);
router.get("/admin/users", authMiddleware(UserRole.ADMIN), userController.getAllOrSearchUser);
router.patch("/admin/users/:userId", authMiddleware(UserRole.ADMIN), userController.updateUserStatus);
router.post("/user/role", userController.updateUserRole);

export const userRouter = router