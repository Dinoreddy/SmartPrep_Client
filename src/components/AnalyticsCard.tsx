interface AnalyticsItem {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

interface AnalyticsCardProps {
  borderColor: string;
  headerIconBg: string;
  headerIconColor: string;
  headerIcon: string;
  title: string;
  items: AnalyticsItem[];
  itemBg: string;
}

export default function AnalyticsCard({
  borderColor,
  headerIconBg,
  headerIconColor,
  headerIcon,
  title,
  items,
  itemBg,
}: AnalyticsCardProps) {
  return (
    <div
      className={`flex-1 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-bouncy border-t-8 ${borderColor}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`size-12 rounded-full ${headerIconBg} flex items-center justify-center ${headerIconColor}`}
        >
          <span className="material-symbols-outlined">{headerIcon}</span>
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={i}
            className={`${itemBg} p-4 rounded-xl flex gap-3 items-start`}
          >
            <span
              className={`material-symbols-outlined ${item.iconColor} mt-1`}
            >
              {item.icon}
            </span>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {item.title}
              </p>
              <p className="text-sm text-slate-500">{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
