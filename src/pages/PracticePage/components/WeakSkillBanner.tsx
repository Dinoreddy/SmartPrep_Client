interface WeakSkillBannerProps {
  label: string;
  labelIcon: string;
  title: string;
  elo: number;
  eloStatus: string;
  description: string;
  ctaLabel: string;
  onStart?: () => void;
}

export default function WeakSkillBanner({
  label,
  labelIcon,
  title,
  elo,
  eloStatus,
  description,
  ctaLabel,
  onStart,
}: WeakSkillBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#FFF8E1] dark:bg-amber-900/20 p-8 md:p-12 shadow-sm group hover:shadow-md transition-all">
      {/* Decorative blobs */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-amber-200/50 dark:bg-amber-600/10 blur-3xl group-hover:bg-amber-300/50 transition-colors duration-500" />
      <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-orange-200/40 dark:bg-orange-600/10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text block */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-800/40 text-amber-700 dark:text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px]">
              {labelIcon}
            </span>
            {label}
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium mb-6">
            Current Elo:{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {elo}
            </span>
            {" • "}
            <span className="text-amber-600 dark:text-amber-400">
              {eloStatus}
            </span>
          </p>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <button
            onClick={onStart}
            className="bg-primary hover:bg-purple-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
          >
            <span className="material-symbols-outlined">play_circle</span>
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
