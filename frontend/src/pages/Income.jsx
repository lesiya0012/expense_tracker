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
    <>
      <UserNavbar />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add Income</h1>

        {/* ✅ Income Form */}
        <form onSubmit={handleAddIncome} className="bg-white p-4 shadow rounded mb-6">
          <div className="mb-3">
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Amount</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Date</label>
            <input
              type="date"
              className="border p-2 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Category</label>
            <select
              className="border p-2 w-full"
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

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Income
          </button>
        </form>

        {/* ✅ Income List */}
        <h2 className="text-xl font-semibold mb-3">Income History</h2>
        <div className="bg-white p-4 shadow rounded">
          {incomeList.map((inc) => (
            <div key={inc._id} className="border-b py-2">
              <p className="font-semibold">{inc.title}</p>
              <p>₹{inc.amount}</p>
              <p>{new Date(inc.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{inc.category}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}