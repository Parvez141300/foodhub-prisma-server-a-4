import { Router } from "express";
import { orderController } from "./order.controller";

const router= Router();

router.post("/orders", orderController.createOrder);

export const orderRouter = router;