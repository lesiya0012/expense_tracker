import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

export default function Income() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("General");
  const [incomeList, setIncomeList] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ Fetch income list
  const fetchIncome = async () => {
    const res = await axios.get("http://localhost:5000/api/income", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIncomeList(res.data);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // ✅ Add income
  const handleAddIncome = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/income",
      { title, amount, date, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("General");

    fetchIncome();
  };

  return (
    <div>
      <UserNavbar />

      <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-emerald-600 mb-6 text-center">
            Add New Income
          </h1>

          {/* ✅ Income Form */}
          <form onSubmit={handleAddIncome} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Income title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>General</option>
                <option>Salary</option>
                <option>Freelance</option>
                <option>Business</option>
                <option>Gift</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Add Income
            </button>
          </form>

          {/* ✅ Income List */}
          <h2 className="text-xl font-semibold mt-8 mb-3 text-emerald-700">
            Income History
          </h2>

          <div className="bg-emerald-50 p-4 rounded-md border border-emerald-200">
            {incomeList.length === 0 ? (
              <p className="text-gray-500 text-center">No income added yet</p>
            ) : (
              incomeList.map((inc) => (
                <div key={inc._id} className="border-b py-2">
                  <p className="font-semibold text-emerald-700">{inc.title}</p>
                  <p>₹{inc.amount}</p>
                  <p>{new Date(inc.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">{inc.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}