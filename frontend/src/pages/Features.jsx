import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faChartColumn,
  faBell,
  faLink,
  faBullseye,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Automatically categorize and track all your expenses in real-time with smart detection.",
    icon: faReceipt,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
  {
    title: "Detailed Analytics",
    description:
      "Get comprehensive insights with beautiful charts showing your spending patterns over time.",
    icon: faChartColumn,
   bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
  {
    title: "Smart Alerts",
    description:
      "Receive notifications when you're approaching budget limits or unusual spending is detected.",
    icon: faBell,
   bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
  {
    title: "Multi-Account Sync",
    description:
      "Connect all your bank accounts and credit cards for a complete financial overview.",
    icon: faLink,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
  {
    title: "Goal Setting",
    description:
      "Set savings goals and track your progress with motivating milestones and achievements.",
    icon: faBullseye,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
  {
    title: "Mobile Ready",
    description:
      "Access your finances anywhere with our fully responsive design that works on any device.",
    icon: faMobileScreenButton,
   bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
     gradient: "from-emerald-100 via-emerald-200 to-transparent"
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Everything You Need to Master Your Money
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Powerful tools designed to help you understand, manage, and grow your finances with ease.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:ring-1 hover:ring-slate-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} ${feature.textColor} transition group-hover:bg-opacity-80`}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className={`text-2xl transition-colors duration-300 group-hover:text-opacity-80`}
                />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {feature.description}
            </p>
             <div
                  className={`mt-6 h-px w-full bg-gradient-to-r ${feature.gradient}`}
                ></div>

           
          </div>
        ))}
      </div>
    </section>
  );
}