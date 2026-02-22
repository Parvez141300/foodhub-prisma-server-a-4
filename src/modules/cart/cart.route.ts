import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.post("/cart", cartController.createCart);

export const cartRouter = router;