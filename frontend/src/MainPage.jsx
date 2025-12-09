
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Features from "./pages/Features";
import Home from "./pages/Home";




export default function MainPage() {
  return (
    <>
      <Navbar/>
        <Home/>
        <section id="about"><About /></section>
        <section id="features"><Features /></section>
      <Footer/>
    </>
  );
}