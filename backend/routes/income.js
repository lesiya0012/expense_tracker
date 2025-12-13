import express from "express";
import Income from "../models/income.js";
import {auth} from "../middlewares/auth.js"

const router = express.Router();

// ✅ Add income
router.post("/", auth, async (req, res) => {
  try {
    const income = new Income({
      ...req.body,
      user: req.userId,
    });

    await income.save();
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all income for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const income = await Income.find({ user: req.userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;