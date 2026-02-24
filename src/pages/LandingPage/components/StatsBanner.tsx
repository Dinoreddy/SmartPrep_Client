interface StatItemProps {
  value: string;
  label: string;
  border?: boolean;
}

function StatItem({ value, label, border = false }: StatItemProps) {
  return (
    <div
      className={`text-center ${border ? "border-l border-white/20 pl-8 md:pl-20" : ""}`}
    >
      <div className="text-4xl font-black mb-1">{value}</div>
      <div className="text-sm font-medium opacity-80 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

const stats = [
  { value: "Sub-Second", label: "Voice Response Latency", border: false },
  { value: "Groq & Deepgram", label: "AI Audio Pipeline", border: true },
  { value: "Dynamic Elo", label: "Skill Rating System", border: true },
];

export default function StatsBanner() {
  return (
    <div className="bg-primary py-12 -rotate-1 origin-left scale-105 shadow-xl relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#fff 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div className="px-6 flex flex-wrap justify-center gap-8 md:gap-20 text-white relative z-10">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
