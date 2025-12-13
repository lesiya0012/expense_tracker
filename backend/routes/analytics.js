import express from "express";
import mongoose from "mongoose";   // <-- add this
import { auth } from "../middlewares/auth.js";
import Expense from "../models/expense.js";
import Income from "../models/income.js";

const router = express.Router();

router.get("/summary", auth, async (req, res) => {
  try {
    const { start, end } = req.query;

    const match = { userId: new mongoose.Types.ObjectId(req.userId) };

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() + 1);
      match.date = { $gte: startDate, $lt: endDate };
    }

    const [summary] = await Expense.aggregate([
      { $match: match },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalSpend: { $sum: "$amount" },
                count: { $sum: 1 },
                average: { $avg: "$amount" }
              }
            }
          ],
          byCategory: [
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $project: { _id: 0, category: "$_id", total: 1 } },
            { $sort: { total: -1 } }
          ]
        }
      }
    ]);

    const totalSpend = summary.totals[0]?.totalSpend || 0;

    // ✅ FIXED Income aggregation
    const incomeAgg = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userId),
          date: { $gte: new Date(start), $lte: new Date(end) }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" }
        }
      }
    ]);

    const totalIncome = incomeAgg[0]?.totalIncome || 0;
    const balance = totalIncome - totalSpend;

    res.json({
      totalSpend,
      count: summary.totals[0]?.count || 0,
      average: summary.totals[0]?.average || 0,
      byCategory: summary.byCategory,
      totalIncome,
      balance
    });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
router.get("/monthly-expenses", auth, async (req, res) => {
  try {
    const data = await Expense.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.userId) }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/monthly-income", auth, async (req, res) => {
  try {
    const data = await Income.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
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