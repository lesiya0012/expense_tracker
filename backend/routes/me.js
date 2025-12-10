import express from "express";
import { auth } from "../middlewares/auth.js";
import User from "../models/User.js";
import Expense from "../models/expense.js";
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const profile = await User.findById(req.userId).select("name email role createdAt");

   

    const recentExpenses = await Expense.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(10);

       res.json({ profile, recentExpenses });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;