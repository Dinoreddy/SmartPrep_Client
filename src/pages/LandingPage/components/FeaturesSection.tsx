import FeatureCard from "../../../components/FeatureCard";

const features = [
  {
    bgColor: "bg-indigo-soft",
    iconBg: "bg-white",
    icon: "graphic_eq",
    iconColor: "text-indigo-600",
    title: "Real-Time Voice Interviews",
    titleSize: "text-2xl",
    description:
      "Seamless, full-duplex conversation powered by low-latency WebSocket audio streaming that feels like a real human interaction.",
    descSize: "text-lg",
    colSpan: "lg:col-span-2",
    decoration: (
      <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-indigo-200/50 blur-2xl group-hover:bg-indigo-300/50 transition-colors" />
    ),
  },
  {
    bgColor: "bg-mint-soft",
    iconBg: "bg-white",
    icon: "assignment_turned_in",
    iconColor: "text-teal-600",
    title: "Comprehensive Mock Tests",
    description:
      "Full-length, role-specific simulations designed to replicate the pressure of actual interviews.",
    decoration: (
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-[100px] text-teal-700">
          assignment
        </span>
      </div>
    ),
  },
  {
    bgColor: "bg-accent-yellow/20",
    iconBg: "bg-white",
    icon: "quiz",
    iconColor: "text-yellow-600",
    title: "Gamified Practice",
    description:
      "Engage in rapid-fire MCQ sessions that focus on skill mastery and quick recall of key concepts.",
  },
  {
    bgColor: "bg-slate-100 dark:bg-slate-800",
    iconBg: "bg-white dark:bg-slate-700",
    icon: "code",
    iconColor: "text-slate-900 dark:text-white",
    title: "Integrated Coding Environment",
    titleSize: "text-2xl",
    titleDark: "dark:text-white",
    description:
      "A fully functional, in-browser code editor tailored for solving live technical challenges without leaving the interview interface.",
    descSize: "text-lg",
    descDark: "dark:text-slate-300",
    colSpan: "lg:col-span-2",
    decoration: (
      <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-20 group-hover:opacity-10 transition-opacity">
        <span className="material-symbols-outlined text-[150px] text-slate-900 dark:text-slate-100">
          terminal
        </span>
      </div>
    ),
  },
  {
    bgColor: "bg-accent-coral/20",
    iconBg: "bg-white",
    icon: "insights",
    iconColor: "text-red-500",
    title: "Actionable Analytics",
    description:
      "Receive deep performance reports and track your growth with our dynamic Elo rating system.",
    decoration: (
      <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-red-100/50 blur-xl group-hover:bg-red-200/50 transition-colors" />
    ),
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-24 bg-white dark:bg-slate-900">
      <div className="px-6 md:px-12 lg:px-20 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Features &amp; Implementation
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Explore the core modules that power the simulation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}
