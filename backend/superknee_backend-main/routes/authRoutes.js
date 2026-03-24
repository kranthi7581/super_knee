import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  testEmail,
  registerAdmin
} from "../controllers/authController.js";

const router = express.Router();

/* ======================
   AUTH ROUTES
====================== */

/* Register new user */
router.post("/register", registerUser);

router.post("/admin/register", registerAdmin);

/* Login user */
router.post("/login", loginUser);

/* Forgot password - send reset link */
router.post("/forgot-password", forgotPassword);

/* ======================
   EMAIL TEST ROUTE
   Used for SMTP testing
====================== */

router.post("/test-email", testEmail);

export default router;