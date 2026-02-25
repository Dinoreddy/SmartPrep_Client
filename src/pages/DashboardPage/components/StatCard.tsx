interface StatCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  badge: string;
}

export default function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  badge,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-1 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
          {badge}
        </span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}
