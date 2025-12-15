import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expense.js";
import authRoutes from "./routes/auth.js";
import meRouter from "./routes/me.js";
import analyticsRouter from "./routes/analytics.js";
import incomeRoutes from "./routes/income.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://expensetrackerfront-neon.vercel.app/'  
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/income", incomeRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Expense Tracker API running" });
});

// Connect to MongoDB
const PORT = process.env.PORT || 4000;
console.log("Mongo URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // ✅ START THE SERVER ONLY AFTER DB CONNECTS
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });