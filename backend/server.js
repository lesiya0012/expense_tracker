import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expense.js";
import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
app.use("/auth", authRoutes);



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
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });