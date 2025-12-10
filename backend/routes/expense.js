import express from "express";
import Expense from "../models/expense.js";
import { auth } from "../middlewares/auth.js";


const router = express.Router();
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount === undefined) {
      return res.status(400).json({ error: "Title and amount are required" });
    }

    const expense = new Expense({
      userId: req.userId,
      title,
      amount,
      category,
      date,
      notes
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});



router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;