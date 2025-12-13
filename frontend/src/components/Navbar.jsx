import { Link, NavLink } from "react-router-dom";
import About from "../pages/About";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">TrackIt</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#features" className="hover:text-gray-900">Features</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}