import { Router } from "express";
import { orderController } from "./order.controller";

const router= Router();

router.get("/orders", orderController.getUserOrders);
router.post("/orders", orderController.createOrder);

export const orderRouter = router;