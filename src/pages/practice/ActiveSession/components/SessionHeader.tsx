import BackButton from "@/components/BackButton";
import { getSkillIcon } from "@/lib/skillIconRegistry";

interface SessionHeaderProps {
  skillName: string;
  elo: number;
  onExit?: () => void;
}

export default function SessionHeader({
  skillName,
  elo,
  onExit,
}: SessionHeaderProps) {
  const { icon } = getSkillIcon(skillName);

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 grid grid-cols-3 items-center">
        {/* ── Left: Back button ─────────────────────────────────── */}
        <div className="flex items-center">
          <BackButton onClick={onExit} label="Back" />
        </div>

        {/* ── Center: Skill name ───────────────────────── */}
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
            {icon}
          </span>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200 capitalize truncate">
            {skillName} Practice
          </span>
        </div>

        {/* ── Right: Elo ────────────────────────────────────────── */}
        <div className="flex items-center justify-end">
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 shrink-0">
            <span className="material-symbols-outlined text-primary text-[14px]">
              trophy
            </span>
            <span className="text-primary font-bold text-xs">{elo}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div> */}
    </header>
  );
}
