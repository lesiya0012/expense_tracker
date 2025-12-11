import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Edit state
  const [editing, setEditing] = useState(null);

  // ✅ Delete function
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  // ✅ Start editing
  const startEdit = (exp) => {
    setEditing({ ...exp }); // clone object
  };

  // ✅ Save edited expense
  const saveEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/expenses/${editing._id}`,
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

      // Update UI
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === editing._id ? res.data : exp))
      );

      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  // ✅ Fetch expenses
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpenses(res.data);
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

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">Your Expenses</h1>

        {expenses.length === 0 ? (
          <p>No expenses yet. Add one!</p>
        ) : (
          <div className="space-y-4">
            {expenses.map((exp) => (
              <div
                key={exp._id}
                className="p-4 bg-white shadow rounded border flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{exp.title}</h2>
                  <p>Amount: ₹{exp.amount}</p>
                  <p>Category: {exp.category || "None"}</p>
                  <p>
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
          <div className="mt-6 p-4 bg-white shadow rounded border">
            <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

            <input
              type="text"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="border p-2 w-full mb-3"
              placeholder="Title"
            />

            <input
              type="number"
              value={editing.amount}
              onChange={(e) =>
                setEditing({ ...editing, amount: e.target.value })
              }
              className="border p-2 w-full mb-3"
              placeholder="Amount"
            />

            <input
              type="text"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="border p-2 w-full mb-3"
              placeholder="Category"
            />

            <input
              type="date"
              value={editing.date?.slice(0, 10)}
              onChange={(e) =>
                setEditing({ ...editing, date: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <button
              onClick={saveEdit}
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(null)}
              className="ml-3 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}