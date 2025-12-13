import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
  
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Ready to Take Control of <span className="text-emerald-400">Your Finances?</span>
        </h2>
        <p className="mt-4 text-slate-300">
  TrackIt is designed to make money management simple, clear, and stress‑free. 
  No complicated dashboards, no confusing charts — just clean insights that help you 
  understand your spending and stay in control.
</p>



        <p className="mt-6 text-lg text-slate-300">
          Join thousands of users who have transformed their financial habits with TrackIt.
          Start your journey to financial freedom today — completely free.
        </p>

        <ul className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 text-slate-200 text-base font-medium">
          {[
            "100% Free Forever",
            "No credit card needed",
            "No hidden fees",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCheck} className="text-emerald-400" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href="/signup"
            className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-white font-bold hover:bg-emerald-600 transition"
          >
            Get Started for Free →
          </a>
        </div>
      </div>
    </section>
   
    </>
  );
}