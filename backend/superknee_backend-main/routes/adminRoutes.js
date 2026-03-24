import express from "express";
const router = express.Router();
import { getAllUsers } from "../controllers/authController.js";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";

// Dashboard Stats
router.get("/stats", getDashboardStats);

// User Management
router.get("/users", getAllUsers);

// Order Management
router.get("/orders", getAllOrders);
router.patch("/orders/:id", updateOrderStatus); // Real-time status update

// Product Management
router.get("/products", getAllProducts);
router.post("/products", createProduct); // Real-time product addition
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Placeholder routes for Reviews and Notifications (to avoid 404)
router.get("/reviews", (req, res) => res.json({ success: true, reviews: [] }));
router.delete("/reviews/:id", (req, res) => res.json({ success: true, message: "Review deleted" }));
router.get("/notifications", (req, res) => res.json({ success: true, notifications: [] }));

export default router;
