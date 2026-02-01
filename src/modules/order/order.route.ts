import { Router } from "express";
import { orderController } from "./order.controller";

const router= Router();

router.get("/orders", orderController.getUserOrders);
router.get("/orders/:orderId", orderController.getOrderDetails);
router.post("/orders", orderController.createOrder);
router.patch("/provider/orders/:orderId", orderController.updateOrderStatus);

export const orderRouter = router;