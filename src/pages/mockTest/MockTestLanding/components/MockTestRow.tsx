import TestTag from "./TestTag";

/** Returns a colour class based on score thresholds. */
function scoreBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-500"; // success
  if (score >= 60) return "bg-amber-500"; // warning
  return "bg-red-500";
}

interface MockTestRowProps {
  title: string;
  time: string;
  tags: readonly string[];
  score: number;
  onViewReport?: () => void;
}

export default function MockTestRow({
  title,
  time,
  tags,
  score,
  onViewReport,
}: MockTestRowProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: title + tags */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {title}
            </h4>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <span className="size-1.5 bg-slate-300 rounded-full inline-block" />
              {time}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TestTag key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Right: score + action */}
        <div className="flex items-center gap-8 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
          <div className="flex flex-col items-end min-w-[60px]">
            <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
              {score}
            </span>
            <div
              className={`h-1 w-full ${scoreBarColor(score)} mt-1 rounded-full`}
            />
          </div>

          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 hidden md:block" />

          <button
            onClick={onViewReport}
            className="flex items-center gap-2 text-primary font-bold text-sm hover:underline underline-offset-4 decoration-2 decoration-primary/30 whitespace-nowrap"
          >
            View Report
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
