import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dns from "dns";

import connectDB from "./config/db.js";

/* Routes */

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { Server } from "socket.io";
import http from "http";

/* ======================
DNS CONFIG (Optional)
Fix MongoDB SRV issues on some servers
====================== */

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Pass io to express app for global access
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/* ======================
CONNECT DATABASE
====================== */

connectDB();

/* ======================
MIDDLEWARE
====================== */

/* CORS */

const allowedOrigins = [
  "https://superkneewebsite.vercel.app",
  "https://super-knee-website.vercel.app",
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "https://superknee-backend.onrender.com",
  "http://localhost:3001",
  "http://localhost:3002"
];

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }

  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

/* Body Parser */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
ROUTES
====================== */

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

/* ======================
HEALTH CHECK
===================== */

/* --- PREVIOUS CODE ---
app.get("/", (req, res) => {
  res.send("Super Knee API Running");
});
----------------------- */

app.get("/", (req, res) => {
  res.send("Super Health API Running");
});

/* ======================
SERVER
====================== */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ======================
OPTIONAL: Check MongoDB SRV
====================== */

dns.resolveSrv(
  "_mongodb._tcp.cluster0.j1z837q.mongodb.net",
  (err, addresses) => {

    if (err) {
      console.warn(
        "MongoDB SRV lookup failed. Check Atlas cluster and whitelist."
      );
      console.warn(err);
      return;
    }

    console.log("MongoDB SRV records:", addresses);

  }
);