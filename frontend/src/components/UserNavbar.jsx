import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-600 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">Expense Tracker</div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6">
          
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
           <Link to="/analytics" className="hover:underline">Analytics</Link>
          <Link to="/expense" className="hover:underline">Add Expense</Link>
          <Link to="/income" className="hover:underline">Add Income</Link>
          <button onClick={logout} className="hover:underline">Logout</button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="flex flex-col gap-4 mt-4 lg:hidden bg-emerald-700 p-4 rounded">
          <Link to="/dashboard" className="hover:underline" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/expense" className="hover:underline" onClick={() => setOpen(false)}>Add Expense</Link>
          <Link to="/analytics" className="hover:underline" onClick={() => setOpen(false)}>Analytics</Link>
          <Link to="/income" className="hover:underline" onClick={() => setOpen(false)}>Income</Link>
          <button onClick={() => { setOpen(false); logout(); }} className="hover:underline">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}