import { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
const API = import.meta.env.VITE_API_BASE_URL ;
export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
console.log("Token being sent:", token);
    try {
      await axios.post(
        `${API}/expenses`,
        { title, amount, category, date, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Expense added!");
      window.location.href = "/dashboard";

    } catch (err) {
      alert("Error adding expense");
    }
  };


  return (
    <div>
    <UserNavbar/>
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-6">
  
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-emerald-600 mb-6 text-center">
          Add New Expense
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Expense title"
              className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Amount
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              type="number"
              className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Date
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Add Expense
          </button>
          
        </form>
      </div>
    </div>
    </div>
    
  );
}