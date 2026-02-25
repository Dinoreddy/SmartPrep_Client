interface Palette {
  bg: string;
  border: string;
  iconColor: string;
  labelColor: string;
  badgeColor: string;
}

interface MockStatCardProps {
  icon: string;
  label: string;
  value: string;
  valueSuffix?: string;
  badge: string;
  palette: Palette;
}

export default function MockStatCard({
  icon,
  label,
  value,
  valueSuffix,
  badge,
  palette,
}: MockStatCardProps) {
  return (
    <div className={`${palette.bg} p-6 rounded-2xl border ${palette.border}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className={`material-symbols-outlined ${palette.iconColor}`}>
          {icon}
        </span>
        <h4
          className={`text-sm font-semibold ${palette.labelColor} uppercase tracking-wide`}
        >
          {label}
        </h4>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
        {valueSuffix && (
          <span className="text-lg text-slate-400 ml-1">{valueSuffix}</span>
        )}
      </div>
      <p className={`text-xs ${palette.badgeColor} mt-1`}>{badge}</p>
    </div>
  );
}
