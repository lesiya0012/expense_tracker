import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../src/MainPage";
import About from "./pages/About";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Expense from "./pages/Expense";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/login" />}/>
        <Route path="/expense" element={token ? <Expense /> : <Navigate to="/login" />} />



        <Route path="/signup" element={<Signup/>} />

      </Routes>
    </Router>
  );
}

export default App;