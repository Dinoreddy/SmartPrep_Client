import AnalyticsCard from "../../../components/AnalyticsCard";

const cards = [
  {
    borderColor: "border-green-400",
    headerIconBg: "bg-green-100",
    headerIconColor: "text-green-600",
    headerIcon: "trending_up",
    title: "Skill Rating Updates",
    itemBg: "bg-green-50 dark:bg-green-900/20",
    items: [
      {
        icon: "arrow_upward",
        iconColor: "text-green-600",
        title: "+18 Elo in Node.js",
        subtitle: "Correctly identified event loop bottlenecks.",
      },
      {
        icon: "arrow_upward",
        iconColor: "text-green-600",
        title: "+12 Elo in System Design",
        subtitle: "Strong CAP theorem application in database choice.",
      },
    ],
  },
  {
    borderColor: "border-orange-400",
    headerIconBg: "bg-orange-100",
    headerIconColor: "text-orange-600",
    headerIcon: "radar",
    title: "Areas to Focus On",
    itemBg: "bg-orange-50 dark:bg-orange-900/20",
    items: [
      {
        icon: "arrow_downward",
        iconColor: "text-orange-600",
        title: "-5 Elo in React Hooks",
        subtitle: "Missed dependency array optimization in useEffect.",
      },
      {
        icon: "priority_high",
        iconColor: "text-orange-600",
        title: "Latency Handling",
        subtitle: "Response time to complex SQL query question was slow.",
      },
    ],
  },
];

export default function AnalyticsSection() {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Actionable Analytics
          </h2>
          <p className="text-lg text-slate-500">
            Data-driven insights from every simulation session.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {cards.map((card) => (
            <AnalyticsCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
