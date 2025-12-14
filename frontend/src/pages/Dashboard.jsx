import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
const API = import.meta.env.VITE_API_BASE_URL || "/api";
export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API}/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  const startEdit = (exp) => {
    setEditing({ ...exp });
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${API}/expenses/${editing._id}`,
        {
          title: editing.title,
          amount: Number(editing.amount),
          category: editing.category,
          date: editing.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === editing._id ? res.data : exp))
      );

      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setExpenses(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-emerald-50 p-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
          Your Expenses
        </h1>

        {expenses.length === 0 ? (
          <p className="text-center text-gray-600">
            No expenses yet. Add one!
          </p>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {expenses.map((exp) => (
              <div
                key={exp._id}
                className="p-4 bg-white shadow-md rounded-lg border border-emerald-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-emerald-700">
                    {exp.title}
                  </h2>
                  <p className="text-gray-700">₹{exp.amount}</p>
                  <p className="text-gray-600">
                    Category: {exp.category || "None"}
                  </p>
                  <p className="text-gray-600">
                    Date:{" "}
                    {exp.date
                      ? new Date(exp.date).toLocaleDateString()
                      : "No date"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(exp)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Edit Form */}
        {editing && (
          <div className="mt-8 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-emerald-200">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">
              Edit Expense
            </h2>

            <input
              type="text"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-emerald-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Title"
            />

            <input
              type="number"
              value={editing.amount}
              onChange={(e) =>
                setEditing({ ...editing, amount: e.target.value })
              }
              className="w-full px-3 py-2 border border-emerald-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Amount"
            />

            <input
              type="text"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-emerald-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Category"
            />

            <input
              type="date"
              value={editing.date?.slice(0, 10)}
              onChange={(e) =>
                setEditing({ ...editing, date: e.target.value })
              }
              className="w-full px-3 py-2 border border-emerald-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={saveEdit}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}