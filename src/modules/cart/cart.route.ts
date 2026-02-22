import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.post("/cart", cartController.createCart);
router.post("/cart/:cartId", cartController.deleteCartItem);

export const cartRouter = router;