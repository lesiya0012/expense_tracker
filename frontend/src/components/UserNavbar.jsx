
import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-600 text-white px-6 py-3 flex justify-between">
      <div className="font-bold text-xl">Expense Tracker</div>

      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/expense" className="hover:underline">Add Expense</Link>
        <Link to="/analytics" className="hover:underline">Analytics</Link>

        <button onClick={logout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}