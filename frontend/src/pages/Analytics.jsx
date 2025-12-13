import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  BarChart,
  Pie,
  Cell,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";

// Group items by month
function groupByMonth(items) {
  return (items || []).reduce((acc, item) => {
    if (!item || !item.date) return acc;
    const monthKey = new Date(item.date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);
    return acc;
  }, {});
}

export default function Analytics() {
  // --------------------
  // Hooks (always at top)
  // --------------------
  const [summary, setSummary] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rawExpenses, setRawExpenses] = useState([]);
  const [rawIncomes, setRawIncomes] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("");

  // --------------------
  // Effect 1: fetch all data once
  // --------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAll = async () => {
      try {
        const summaryRes = await axios.get(
          "http://localhost:5000/api/analytics/summary?start=2025-12-01&end=2025-12-31",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const timeseriesRes = await axios.get(
          "http://localhost:5000/api/analytics/timeseries?start=2025-12-01&end=2025-12-31&group=day",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const expensesRes = await axios.get(
          "http://localhost:5000/api/expenses",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const incomesRes = await axios.get(
          "http://localhost:5000/api/income",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const [expenseAgg, incomeAgg] = await Promise.all([
          axios.get("http://localhost:5000/api/analytics/monthly-expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/analytics/monthly-income", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSummary(summaryRes.data || null);
        setTimeseries(timeseriesRes.data || []);
        setRawExpenses(expensesRes.data || []);
        setRawIncomes(incomesRes.data || []);
        setIncomeHistory(incomesRes.data || []);

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const expenseMap = {};
        const incomeMap = {};

        (expenseAgg?.data || []).forEach((e) => {
          expenseMap[e._id] = e.total;
        });
        (incomeAgg?.data || []).forEach((i) => {
          incomeMap[i._id] = i.total;
        });

        const merged = months.map((m, index) => ({
          month: m,
          income: incomeMap[index + 1] || 0,
          expense: expenseMap[index + 1] || 0,
        }));

        setMonthlyData(merged);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // --------------------
  // Effect 2: auto-select latest month
  // This effect is declared BEFORE any derived logic or early returns
  // --------------------
  useEffect(() => {
    if (!selectedMonth) {
      const expenseMonths = Object.keys(groupByMonth(rawExpenses));
      const incomeMonths = Object.keys(groupByMonth(rawIncomes));
      const all = Array.from(new Set([...expenseMonths, ...incomeMonths])).sort(
        (a, b) => new Date(b) - new Date(a)
      );
      if (all.length > 0) {
        setSelectedMonth(all[0]);
      }
    }
  }, [rawExpenses, rawIncomes, selectedMonth]);

  // --------------------
  // Derived values (after hooks)
  // --------------------
  const expenseByMonth = groupByMonth(rawExpenses);
  const incomeByMonth = groupByMonth(rawIncomes);

  const allMonths = Array.from(
    new Set([...Object.keys(expenseByMonth), ...Object.keys(incomeByMonth)])
  ).sort((a, b) => new Date(b) - new Date(a));

  const selectedExpenses = selectedMonth ? expenseByMonth[selectedMonth] || [] : [];
  const selectedIncomes = selectedMonth ? incomeByMonth[selectedMonth] || [] : [];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
  // ✅ Month-specific totals
const totalIncomeForMonth = selectedIncomes.reduce(
  (sum, inc) => sum + (inc.amount || 0),
  0
);

const totalExpenseForMonth = selectedExpenses.reduce(
  (sum, exp) => sum + (exp.amount || 0),
  0
);

const balanceForMonth = totalIncomeForMonth - totalExpenseForMonth;

// ✅ Category breakdown for selected month
const categoryTotals = selectedExpenses.reduce((acc, exp) => {
  if (!exp.category) return acc;
  if (!acc[exp.category]) acc[exp.category] = 0;
  acc[exp.category] += exp.amount || 0;
  return acc;
}, {});

// ✅ Convert to array for charts
const categoryArray = Object.keys(categoryTotals).map((cat) => ({
  category: cat,
  total: categoryTotals[cat],
}));

  // --------------------
  // Safe early return after hooks
  // --------------------
  if (loading) return <div className="p-6">Loading analytics...</div>;

  // --------------------
  // Full return JSX
  // --------------------
 return (
  <>
    <UserNavbar />

    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {/* ✅ Month Dropdown */}
      {allMonths.length > 0 && (
        <div className="mb-6">
          <label className="font-semibold mr-3">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {allMonths.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}

      {/* ✅ No data for selected month */}
      {selectedExpenses.length === 0 && selectedIncomes.length === 0 && (
        <div className="bg-white p-6 shadow rounded text-center">
          <p className="text-gray-500 mb-4">
            No data for {selectedMonth}
          </p>
          <div className="flex justify-center gap-4">
            <a href="/expense" className="bg-emerald-600 text-white px-4 py-2 rounded">
              Add Expense
            </a>
            <a href="/income" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Income
            </a>
          </div>
        </div>
      )}

      {/* ✅ TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* ✅ Month-Specific Balance Overview */}
        <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            {selectedMonth} Overview
          </h2>

          <p className="text-lg">
            <span className="font-semibold">Total Income:</span> ₹{totalIncomeForMonth}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Total Spend:</span> ₹{totalExpenseForMonth}
          </p>

          <p className="text-lg mt-2">
            <span className="font-semibold">Balance:</span>{" "}
            <span className={balanceForMonth >= 0 ? "text-green-700" : "text-red-600"}>
              ₹{balanceForMonth}
            </span>
          </p>
        </div>

        {/* ✅ Month-Specific Income vs Expense */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">
            Income vs Expense ({selectedMonth})
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: "Income", value: totalIncomeForMonth },
              { name: "Expense", value: totalExpenseForMonth }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ✅ Category Breakdown */}
      {categoryArray.length > 0 && (
        <div className="bg-white p-6 shadow rounded mt-6">
          <h2 className="text-xl font-semibold mb-3">Category Breakdown</h2>

          <ul className="mb-4">
            {categoryArray.map((cat) => (
              <li key={cat.category}>
                {cat.category}: ₹{cat.total}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryArray}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryArray.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryArray} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Spend" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

      {/* ✅ Month-Specific Expense History */}
      <div className="bg-white p-6 shadow rounded mt-6">
        <h2 className="text-xl font-semibold mb-3">Expense History ({selectedMonth})</h2>

        <ul className="space-y-2">
          {selectedExpenses.map((item) => (
            <li key={item._id} className="border-b pb-2 flex justify-between text-gray-700">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              <span>{item.title}</span>
              <span>₹{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Month-Specific Income History */}
      <div className="bg-white p-6 shadow rounded mt-6">
        <h2 className="text-xl font-semibold mb-3">Income History ({selectedMonth})</h2>

        <ul className="space-y-2">
          {selectedIncomes.map((inc) => (
            <li key={inc._id} className="border-b pb-2 flex justify-between text-gray-700">
              <span>{new Date(inc.date).toLocaleDateString()}</span>
              <span>{inc.title}</span>
              <span>₹{inc.amount}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </>
);
}