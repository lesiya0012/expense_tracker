import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log("Signup response:", data); // ✅ debug

    if (response.ok) {
      localStorage.setItem("token", data.token); // ✅ save token
      alert("Signup successful!");
      window.location.href = "/expense";
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex">
      
        <div className="w-full md:w-1/2 flex flex-col justify-center px-20 bg-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Create your account</h2>
          <p className="text-2xl text-gray-700 mb-7">
            Fill in your details to get started
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

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
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2.5 rounded-md text-sm hover:bg-emerald-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-lg text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right: Promo Panel */}
        <div className="hidden md:flex w-1/2 bg-emerald-50 flex-col justify-center mb-16 items-center px-8">
          <p className="text-3xl font-medium text-gray-700 mb-2">
            Start your journey with us
          </p>
          <p className="text-md-center text-gray-500">
            Create an account and begin tracking your expenses today.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}