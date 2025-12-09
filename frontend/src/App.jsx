import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../src/MainPage";
import About from "./pages/About";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

      </Routes>
    </Router>
  );
}

export default App;