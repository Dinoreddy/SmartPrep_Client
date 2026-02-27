import LiveHeroBanner from "./components/LiveHeroBanner";
import {
  LIVE_STAT_CARDS,
  CONTEXT_TOPICS,
  SUGGESTED_QUESTIONS,
  RECENT_SESSIONS,
} from "./constants";

export default function LiveInterviewLandingPage() {
  function handleInitialize() {
    // TODO: connect socket and navigate to active session
    console.log("Initializing voice engine…");
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Live Session
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Real-time voice analysis and technical feedback engine.
            </p>
          </div>
          <button className="size-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
        </div>

        {/* ── Hero / voice engine banner ────────────────────────────────── */}
        <LiveHeroBanner onInitialize={handleInitialize} />

        {/* ── Stat cards ───────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIVE_STAT_CARDS.map((card) => (
            <div
              key={card.label}
              className="flex flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.label}
                </span>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-[20px]">
                  {card.icon}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.value}
                </span>
                <span
                  className={`text-xs font-medium px-1.5 py-0.5 rounded ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        {/* ── Two-column section ────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Loaded context */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Loaded Context
              </h3>
              <button className="text-sm font-medium text-primary hover:text-indigo-700 transition-colors">
                Manage Context
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              {/* Topic chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CONTEXT_TOPICS.map((topic) => (
                  <span
                    key={topic.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {topic.icon}
                    </span>
                    {topic.label}
                  </span>
                ))}
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-dashed border-slate-300 hover:border-slate-400 bg-transparent text-xs font-medium text-slate-500 hover:text-slate-700 dark:border-slate-600 dark:hover:border-slate-500 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">
                    add
                  </span>
                  Add Topic
                </button>
              </div>

              {/* Suggested questions */}
              <h4 className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 mb-3 tracking-wider">
                Suggested Questions Preview
              </h4>
              <div className="space-y-3">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <div key={q} className="flex gap-3 items-start group">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {q}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Recent sessions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Sessions
            </h3>
            <div className="flex flex-col gap-2">
              {RECENT_SESSIONS.map((session) => (
                <a
                  key={session.title}
                  href="#"
                  className="group flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {session.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {session.time} • {session.duration} duration
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 text-[20px]">
                    chevron_right
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-8 flex justify-between items-center text-xs text-slate-400">
          <p>© 2025 SmartPrep. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-slate-600 dark:hover:text-slate-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-slate-600 dark:hover:text-slate-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-slate-600 dark:hover:text-slate-300"
            >
              Help
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
