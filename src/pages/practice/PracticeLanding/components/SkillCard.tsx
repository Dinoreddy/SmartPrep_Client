import { motion } from "framer-motion";
import { getSkillIcon } from "@/lib/skillIconRegistry";

/** Animated SVG Semi-circular gauge using framer-motion */
function SkillGauge({ solved, total }: { solved: number; total: number }) {
  const percent = total > 0 ? Math.min(solved / total, 1) : 0;

  const width = 160; // 10rem = 160px
  const height = 80; // 5rem = 80px
  const strokeWidth = 12; // matching previous border-[12px]
  const radius = (width - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percent);

  // SVG Path for a semi-circle: Sweep from bottom-left to bottom-right
  const pathD = `M ${strokeWidth / 2} ${height} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height}`;

  return (
    <div className="relative w-40 h-20 overflow-hidden mb-2 flex flex-col items-center justify-end">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute top-0 left-0"
      >
        {/* Background Arc */}
        <path
          d={pathD}
          fill="none"
          className="stroke-slate-100 dark:stroke-slate-700"
          strokeWidth={strokeWidth}
        />
        {/* Dynamic Animated Arc */}
        <motion.path
          d={pathD}
          fill="none"
          className="stroke-[#34D399]"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      {/* Inner Label */}
      <div className="z-10 pb-1 leading-none font-black text-slate-900 dark:text-white flex items-baseline">
        <span className="text-2xl">{solved}</span>
        <span className="text-lg text-slate-400 font-medium ml-1">
          /{total}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export interface SkillCardProps {
  /** Skill name — used to auto-resolve icon + colours from the registry. */
  title: string;
  elo: number;
  solved: number;
  total: number;
  onPractice?: () => void;
}

export default function SkillCard({
  title,
  elo,
  solved,
  total,
  onPractice,
}: SkillCardProps) {
  // Icon config is resolved automatically — no need to pass colours from parent
  const { icon, iconBg, iconColor, cornerBg } = getSkillIcon(title);

  return (
    <div className="bg-white dark:bg-[#1e142b] rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-800 transition-all group flex flex-col justify-between h-full relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${cornerBg} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}
            >
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h4>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
            Elo: {elo}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <SkillGauge solved={solved} total={total} />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Questions Solved
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onPractice}
          className="w-full py-2 flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors"
        >
          Practice Now
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
