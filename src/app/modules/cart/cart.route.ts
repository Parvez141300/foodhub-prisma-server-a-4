import { Router } from "express";
import { cartController } from "./cart.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
    "/cart",
    authMiddleware(UserRole.CUSTOMER),
    cartController.getAllOrQueryUserCart
);
router.post(
    "/cart",
    authMiddleware(UserRole.CUSTOMER),
    cartController.createCart
);
router.delete(
    "/cart/:cartId",
    authMiddleware(UserRole.CUSTOMER),
    cartController.deleteCartItem
);

export const cartRouter = router;