import { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleware, { UserRole } from "../../middleware/authMiddleware";

const router = Router();

router.get("/orders", orderController.getUserOrders);
router.get("/orders/:orderId", orderController.getOrderDetails);
router.post("/orders", authMiddleware(UserRole.CUSTOMER), orderController.createOrder);
router.patch("/provider/orders/:orderId", authMiddleware(UserRole.PROVIDER), orderController.updateOrderStatus);

export const orderRouter = router;