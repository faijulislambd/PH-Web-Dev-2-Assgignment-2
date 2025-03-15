import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/revenue", orderController.calculateRevenue);

export const OrderRoute = router;
