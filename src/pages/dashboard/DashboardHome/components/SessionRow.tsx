interface SessionRowProps {
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  subtitle: string;
  score: string;
  scoreLabel: string;
}

export default function SessionRow({
  iconBg,
  iconColor,
  icon,
  title,
  subtitle,
  score,
  scoreLabel,
}: SessionRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
      <div
        className={`h-12 w-12 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} flex-shrink-0 group-hover:scale-105 transition-transform`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="text-right">
        <span className="block text-sm font-bold text-slate-900 dark:text-white">
          {score}
        </span>
        <span className="block text-xs text-slate-500 dark:text-slate-400">
          {scoreLabel}
        </span>
      </div>
    </div>
  );
}
