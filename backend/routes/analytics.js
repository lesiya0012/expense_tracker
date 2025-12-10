import express from "express";
import mongoose from "mongoose";   // <-- add this
import { auth } from "../middlewares/auth.js";
import Expense from "../models/expense.js";

const router = express.Router();

router.get("/summary", auth, async (req, res) => {
  try {
    const { start, end } = req.query;

    const match = { userId: new mongoose.Types.ObjectId(req.userId) };

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      // make end exclusive to avoid boundary issues
      endDate.setDate(endDate.getDate() + 1);
      match.date = { $gte: startDate, $lt: endDate };
    }

    const [summary] = await Expense.aggregate([
      { $match: match },
      {
        $facet: {
          totals: [
            { $group: { _id: null, totalSpend: { $sum: "$amount" }, count: { $sum: 1 }, average: { $avg: "$amount" } } }
          ],
          byCategory: [
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $project: { _id: 0, category: "$_id", total: 1 } },
            { $sort: { total: -1 } }
          ]
        }
      }
    ]);

    

    res.json({
      totalSpend: summary.totals[0]?.totalSpend || 0,
      count: summary.totals[0]?.count || 0,
      average: summary.totals[0]?.average || 0,
      byCategory: summary.byCategory
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
router.get("/timeseries", auth, async (req, res) => {
  try {
    const { start, end, group = "month" } = req.query;

    const match = { userId: new mongoose.Types.ObjectId(req.userId) };
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() + 1); // make end exclusive
      match.date = { $gte: startDate, $lt: endDate };
    }

    const format =
      group === "month" ? "%Y-%m" :
      group === "week" ? "%G-W%V" :
      "%Y-%m-%d";

    const data = await Expense.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format, date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $project: { _id: 0, label: "$_id", total: 1 } },
      { $sort: { label: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;