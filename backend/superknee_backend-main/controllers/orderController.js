import { sendEmail } from "../utils/emailUtils.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js"; // Added Product import

import orderPlacedTmpl from "../templates/orderPlaced.js";
import orderConfirmedTmpl from "../templates/orderConfirmed.js";
import orderShippedTmpl from "../templates/orderShipped.js";
import orderCancelledTmpl from "../templates/orderCancelled.js";

/* ======================
ORDER PLACED
====================== */
export const orderPlaced = async (req, res) => {
  try {
    const { userId, orderId, items, total } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const html = orderPlacedTmpl(user.name, orderId, total);
    /* --- PREVIOUS CODE ---
    await sendEmail(user.email, "Super Knee - Order Placed Successfully", html);
    ----------------------- */
    await sendEmail(user.email, "Super Health - Order Placed Successfully", html);

    res.json({ success: true, message: "Order placed email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
ORDER CONFIRMED
====================== */
export const orderConfirmed = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const html = orderConfirmedTmpl(user.name, orderId);
    /* --- PREVIOUS CODE ---
    await sendEmail(user.email, "Super Knee - Order Confirmed", html);
    ----------------------- */
    await sendEmail(user.email, "Super Health - Order Confirmed", html);

    res.json({ success: true, message: "Order confirmation email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
ORDER SHIPPED
====================== */
export const orderShipped = async (req, res) => {
  try {
    const { userId, orderId, trackingNumber } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const html = orderShippedTmpl(user.name, orderId, trackingNumber);
    /* --- PREVIOUS CODE ---
    await sendEmail(user.email, "Super Knee - Your Order Has Been Shipped", html);
    ----------------------- */
    await sendEmail(user.email, "Super Health - Your Order Has Been Shipped", html);

    res.json({ success: true, message: "Order shipped email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
ORDER CANCELLED
====================== */
export const orderCancelled = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const html = orderCancelledTmpl(user.name, orderId);
    /* --- PREVIOUS CODE ---
    await sendEmail(user.email, "Super Knee - Order Cancelled", html);
    ----------------------- */
    await sendEmail(user.email, "Super Health - Order Cancelled", html);

    res.json({ success: true, message: "Order cancelled email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
GET ALL ORDERS (Admin)
====================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

/* ======================
UPDATE ORDER STATUS (Admin/Real-time)
====================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
/* --- PREVIOUS CODE ---
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { orderStatus }, 
      { new: true }
    ).populate("userId", "name email");
----------------------- */

    // Fetch existing order to check previous status
    const existingOrder = await Order.findById(req.params.id);
    if (!existingOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const previousStatus = existingOrder.orderStatus;
    
    // Update the order
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { orderStatus }, 
      { new: true }
    ).populate("userId", "name email");

    // INDUSTRY LOGIC: If order is Cancelled, return the stock
    if (orderStatus === "Cancelled" && previousStatus !== "Cancelled") {
      if (order.items) {
        for (const item of order.items) {
          if (item.productId) {
            const updatedProduct = await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stock: item.quantity } },
              { new: true }
            );

            // Broadcast real-time stock update
            const io = req.app.get("io");
            if (io && updatedProduct) {
              io.emit("product:updated", updatedProduct);
              console.log(`[SOCKET] Broadcasted stock restoration for: ${updatedProduct.name}`);
            }
          }
        }
      }
    }
    // If order was Cancelled and is now being re-opened (Paid/Processing), decrease stock again
    else if (previousStatus === "Cancelled" && orderStatus !== "Cancelled") {
       if (order.items) {
        for (const item of order.items) {
          if (item.productId) {
            const updatedProduct = await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stock: -item.quantity } },
              { new: true }
            );

            // Broadcast real-time stock update
            const io = req.app.get("io");
            if (io && updatedProduct) {
              io.emit("product:updated", updatedProduct);
            }
          }
        }
      }
    }

    // Real-time notification for order update
    const io = req.app.get("io");
    if (io) {
      io.emit("order:updated", order);
      console.log(`[SOCKET] Broadcasted order update: ${order._id}`);
    }

    res.json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};