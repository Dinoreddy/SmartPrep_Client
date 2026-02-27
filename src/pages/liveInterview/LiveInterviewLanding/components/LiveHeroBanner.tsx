interface LiveHeroBannerProps {
  onInitialize: () => void;
}

export default function LiveHeroBanner({ onInitialize }: LiveHeroBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-white/10 min-h-[300px] flex flex-col justify-between p-8"
      style={{
        background: "radial-gradient(circle at bottom left, #0f172a, #020617)",
      }}
    >
      {/* ── Animated wave visualizer (right side) ──────────────────── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-2/3 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center translate-x-12 lg:translate-x-24">
          {/* Core pulsing dot */}
          <div className="relative z-20 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white animate-core-pulse" />
            <div className="absolute h-4 w-4 rounded-full bg-indigo-500 blur-sm animate-ping opacity-75" />
          </div>

          {/* Wave bars */}
          <div className="absolute flex items-center gap-1.5 h-64 z-10">
            <div className="w-1.5 h-12 bg-indigo-500/30 rounded-full animate-wave-pulse-slow  delay-75" />
            <div className="w-1.5 h-20 bg-indigo-500/40 rounded-full animate-wave-pulse        delay-100" />
            <div className="w-1.5 h-32 bg-indigo-500/50 rounded-full animate-wave-pulse-fast   delay-150" />
            <div className="w-1.5 h-48 bg-indigo-500/60 rounded-full animate-wave-pulse        delay-200" />
            <div className="w-1.5 h-24 bg-indigo-500/50 rounded-full animate-wave-pulse-slow   delay-300" />
            <div className="w-1.5 h-16 bg-indigo-500/40 rounded-full animate-wave-pulse-fast   delay-100" />
            <div className="w-8  h-2" />
            <div className="w-1.5 h-16 bg-indigo-500/40 rounded-full animate-wave-pulse-fast   delay-200" />
            <div className="w-1.5 h-24 bg-indigo-500/50 rounded-full animate-wave-pulse-slow   delay-100" />
            <div className="w-1.5 h-48 bg-indigo-500/60 rounded-full animate-wave-pulse        delay-300" />
            <div className="w-1.5 h-32 bg-indigo-500/50 rounded-full animate-wave-pulse-fast   delay-150" />
            <div className="w-1.5 h-20 bg-indigo-500/40 rounded-full animate-wave-pulse        delay-75" />
            <div className="w-1.5 h-12 bg-indigo-500/30 rounded-full animate-wave-pulse-slow   delay-200" />
          </div>

          {/* Glow blobs */}
          <div className="absolute h-64 w-96 bg-indigo-600/10  blur-3xl rounded-full animate-pulse" />
          <div className="absolute h-32 w-64 bg-indigo-500/20  blur-2xl rounded-full animate-pulse delay-150" />
        </div>

        {/* Edge fade */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-transparent to-slate-900 dark:from-black dark:to-black opacity-30" />
      </div>

      {/* ── Text content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-lg mt-4">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md mb-6 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
          </span>
          WebSocket Connection Ready
        </div>

        <h3 className="text-4xl font-semibold text-white tracking-tight mb-4">
          Live Voice Mock Session
        </h3>
        <p className="text-indigo-200/70 text-base leading-relaxed max-w-md">
          Establish a sub-second latency voice channel with your AI Staff
          Engineer. Your parsed resume context is already loaded. Speak
          naturally — the engine will pause when you think and dynamically adapt
          to your technical answers.
        </p>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-8">
        <button
          onClick={onInitialize}
          className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:animate-pulse">
            mic
          </span>
          Initialize Voice Engine
        </button>
      </div>
    </div>
  );
}
