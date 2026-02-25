interface TodayFocusBannerProps {
  badge: string;
  badgeIcon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaIcon: string;
}

export default function TodayFocusBanner({
  badge,
  badgeIcon,
  title,
  description,
  ctaLabel,
  ctaIcon,
}: TodayFocusBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-blue-700 shadow-lg shadow-primary/25 text-white p-8 md:p-10">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">
              {badgeIcon}
            </span>
            {badge}
          </div>
          <h2 className="text-3xl font-bold leading-tight">{title}</h2>
          <p className="text-blue-100 max-w-xl text-lg leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="group flex items-center gap-2 bg-white text-primary hover:bg-blue-50 transition-all duration-300 font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-0.5">
            <span>{ctaLabel}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              {ctaIcon}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
