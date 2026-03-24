import express from "express";
const router = express.Router();
import { createRazorpayOrder, verifyPayment, getUserOrders } from "../controllers/paymentController.js";
import { auth } from "../middleware/authMiddleware.js"; // Using correct middleware name

router.post("/create-order", auth, createRazorpayOrder);
router.post("/verify-payment", auth, verifyPayment);
router.get("/user-orders", auth, getUserOrders);

export default router;
