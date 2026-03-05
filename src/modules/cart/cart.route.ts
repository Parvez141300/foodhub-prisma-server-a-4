import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.get("/cart/:userId", cartController.getUserCart);
router.post("/cart", cartController.createCart);
router.delete("/cart/:cartId", cartController.deleteCartItem);

export const cartRouter = router;