import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ import navigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {  // ✅ fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ save token
        navigate("/dashboard"); // ✅ redirect
      } else {
        alert(data.error || "Login failed"); // backend sends { error: "..."}
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-20 bg-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome back</h2>
          <p className="text-2xl text-gray-700 mb-7">
            Enter your credentials to access your account
          </p>

          {/* ✅ attach handleSubmit to form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <div className="text-right mt-2.5">
                <a href="#" className="text-s text-emerald-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2.5 rounded-md text-sm hover:bg-emerald-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-lg text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-emerald-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right: Promo Panel */}
        <div className="hidden md:flex w-1/2 bg-emerald-50 flex-col justify-center mb-16 items-center px-8">
          <p className="text-3xl font-medium text-gray-700 mb-2">
            Join 50,000+ users managing their finances
          </p>
          <p className="text-md-center text-gray-500">
            Start tracking your expenses and watch your savings grow with our intelligent tools.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}