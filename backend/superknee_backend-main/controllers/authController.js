import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/emailUtils.js";
import welcomeEmail from "../templates/welcomeEmail.js";
import resetPassword from "../templates/resetPassword.js";

/* ======================
ADMIN REGISTER
====================== */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin"
    });

    const html = welcomeEmail(name);
    
    sendEmail(email, "Welcome to Super Health 🎉", html)
      .then(() => console.log(`Welcome email successfully sent to ${role || "admin"} ${email}`))
      .catch((err) => console.error(`Error sending welcome email to ${role || "admin"} ${email}:`, err));

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ======================
REGISTER USER
====================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    const html = welcomeEmail(name);

    sendEmail(email, "Welcome to Super Health 🎉", html)
      .then(() => console.log(`Welcome email successfully sent to user ${email}`))
      .catch((err) => console.error(`Error sending welcome email to user ${email}:`, err));

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ======================
LOGIN USER
====================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ======================
FORGOT PASSWORD
====================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetExpire = Date.now() + 1000 * 60 * 60;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log(`[LOG] forgotPassword: user found: ${user.email}`);
    console.log(`[LOG] forgotPassword: Generating HTML template for ${user.name}`);
    
    const html = resetPassword(user.name, resetLink);
    
    console.log(`[LOG] forgotPassword: HTML generated (length: ${html.length})`);

    sendEmail(user.email, "Reset Your Password", html)
      .then(() => console.log(`Reset password email successfully sent to ${user.email}`))
      .catch((err) => console.error(`Error sending reset password email to ${user.email}:`, err));

    res.json({
      success: true,
      message: "Reset password email sent"
    });
  } catch (error) {
    console.error(`[LOG] forgotPassword ERROR:`, error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ======================
TEST EMAIL
====================== */
export const testEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("Testing email to:", email);
    await sendEmail(
      email,
      "Email Test Successful",
      `<h1>SMTP Working ✅</h1><p>Your email configuration is correct.</p>`
    );

    res.json({
      success: true,
      message: "Test email sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Test email failed",
      error: error.message
    });
  }
};

/* ======================
GET ALL USERS (Admin)
====================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};