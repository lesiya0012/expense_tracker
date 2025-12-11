import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

// ✅ Import Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // ✅ Fetch summary
        const summaryRes = await axios.get(
          "http://localhost:5000/api/analytics/summary?start=2025-12-01&end=2025-12-31",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // ✅ Fetch timeseries
        const timeseriesRes = await axios.get(
          "http://localhost:5000/api/analytics/timeseries?start=2025-12-01&end=2025-12-31&group=day",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSummary(summaryRes.data);
        setTimeseries(timeseriesRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading analytics...</div>;

  // ✅ Colors for Pie Chart
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <>
      <UserNavbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        {/* ✅ Summary Section */}
        {summary && (
          <div className="bg-white p-4 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <p>Total Spend: ₹{summary.totalSpend}</p>
            <p>Number of Expenses: {summary.count}</p>
            <p>Average Spend: ₹{summary.average.toFixed(2)}</p>
          </div>
        )}

        {/* ✅ Category Breakdown + Pie Chart */}
        {summary?.byCategory && (
          <div className="bg-white p-4 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-3">Category Breakdown</h2>

            {/* List */}
            <ul className="mb-4">
              {summary.byCategory.map((cat) => (
                <li key={cat.category}>
                  {cat.category}: ₹{cat.total}
                </li>
              ))}
            </ul>

            {/* ✅ Pie Chart */}
            <PieChart width={400} height={300}>
              <Pie
                data={summary.byCategory}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {summary.byCategory.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </div>
        )}

        {/* ✅ Timeseries + Line Chart */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-3">Timeseries</h2>

          {/* List */}
          <ul className="mb-4">
            {timeseries.map((item) => (
              <li key={item.label}>
                {item.label}: ₹{item.total}
              </li>
            ))}
          </ul>

          {/* ✅ Line Chart */}
          <LineChart width={600} height={300} data={timeseries}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>
    </>
  );
}