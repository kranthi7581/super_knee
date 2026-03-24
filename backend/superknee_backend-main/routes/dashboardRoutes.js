import express from "express";
const router = express.Router();
import { getDashboardStats } from "../controllers/dashboardController.js";

router.get("/stats", getDashboardStats);

export default router;