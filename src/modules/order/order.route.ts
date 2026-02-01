import { Router } from "express";
import { orderController } from "./order.controller";

const router= Router();

router.get("/orders", orderController.getUserOrders);
router.get("/orders/:orderId", orderController.getOrderDetails);
router.post("/orders", orderController.createOrder);

export const orderRouter = router;