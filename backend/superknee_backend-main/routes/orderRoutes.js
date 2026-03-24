import express from "express";

import {
  orderPlaced,
  orderConfirmed,
  orderShipped,
  orderCancelled
} from "../controllers/orderController.js";

const router = express.Router();

/* ======================
ORDER EMAIL ROUTES
====================== */

/* Order placed */
router.post("/placed", orderPlaced);

/* Order confirmed */
router.post("/confirmed", orderConfirmed);

/* Order shipped */
router.post("/shipped", orderShipped);

/* Order cancelled */
router.post("/cancelled", orderCancelled);

export default router;