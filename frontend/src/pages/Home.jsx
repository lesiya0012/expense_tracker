import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Home() {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Money Saved", value: "$2M+" },
    { label: "User Rating", value: "4.9" },
  ];

  return (
    <>
     
      <main className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 gap-10 items-center justify-center text-center flex flex-col">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span>Track. Plan. </span>
              <span>
                <span className="text-emerald-700 rounded px-2">Succeed.</span>
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              <span className="block">Your completely free expense tracker.</span>
              <span className="block">
                Track your spending, plan your budget, and succeed in your financial goals
              </span>
              <span className="block">no hidden fees, no premium tiers.</span>
            </p>

            <div className="mt-8 flex justify-center items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-white font-bold hover:bg-emerald-700 transition"
              >
                Start Free — Forever
                <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 pb-16">
            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"
                >
                  <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
       
      </main>
    </>
  );
}