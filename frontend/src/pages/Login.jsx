import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  
const API = import.meta.env.VITE_API_BASE_URL ;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }


    try {
    //;
      //console.log("Sending login request to:", url);
      const response = await fetch(`https://expense-tracker-jet-chi-39.vercel.app/api/auth/signup`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); 
        navigate("/dashboard"); 
      } else {
         setError(data.error || "Login failed");
      }
    } catch (err) {
     setError("Server error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
      
        <div className="w-full md:w-1/2 flex flex-col justify-center px-20 bg-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome back</h2>
          <p className="text-2xl text-gray-700 mb-7">
            Enter your credentials to access your account
          </p>

          <form className="space-y-3" onSubmit={handleSubmit} noValidate autoComplete="off">
            {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-3">
              {error}
                </div>
                  )}
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
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              
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