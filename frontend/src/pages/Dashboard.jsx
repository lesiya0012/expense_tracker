import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import useNavigate
import axios from "axios";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const navigate = useNavigate();   // ✅ initialize navigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch summary
    axios.get("http://localhost:5000/api/analytics/summary?start=2025-12-01&end=2025-12-31", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSummary(res.data));

    // Fetch timeseries
    axios.get("http://localhost:5000/api/analytics/timeseries?start=2025-12-01&end=2025-12-31&group=day", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTimeseries(res.data));
  }, [navigate]);

  return (
    <>
      <div>
        <h2>Dashboard</h2>
        {summary && (
          <div>
            <p>Total Spend: {summary.totalSpend}</p>
            <p>Count: {summary.count}</p>
            <p>Average: {summary.average}</p>
          </div>
        )}

        <h3>Timeseries Data</h3>
        <ul>
          {timeseries.map((item) => (
            <li key={item.label}>
              {item.label}: {item.total}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");   // ✅ now works
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Dashboard;