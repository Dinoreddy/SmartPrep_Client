interface HeroBannerProps {
  titleLine1: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaIcon: string;
  durationLabel: string;
  durationIcon: string;
  onStart?: () => void;
}

export default function HeroBanner({
  titleLine1,
  titleHighlight,
  description,
  ctaLabel,
  ctaIcon,
  durationLabel,
  durationIcon,
  onStart,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d0621] via-[#1c0a40] to-[#4757e4] shadow-xl">
      {/* Glow blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-violet-600/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 p-10 md:p-14">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
          MCQ Challenge
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          {titleLine1}
          <br />
          <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </h1>

        <p className="text-lg text-white/55 max-w-2xl leading-relaxed mb-10">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onStart}
            className="flex items-center gap-2.5 bg-white hover:bg-slate-100 text-[#1c0a40] font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-black/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-primary">
              {ctaIcon}
            </span>
            {ctaLabel}
          </button>

          <div className="flex items-center gap-2 text-white/50 bg-white/8 px-4 py-2.5 rounded-lg border border-white/10 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[18px]">
              {durationIcon}
            </span>
            <span className="text-sm font-medium">{durationLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
