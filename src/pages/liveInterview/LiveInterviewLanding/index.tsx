import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { routes } from "@/routes/paths";
import { dashboardApi } from "@/api/dashboard.api";
import LiveHeroBanner from "./components/LiveHeroBanner";

function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-pulse space-y-3"
        >
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-3 w-32 bg-slate-100 dark:bg-slate-850 rounded" />
        </div>
      ))}
    </div>
  );
}

function RecentSessionsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm animate-pulse flex items-center justify-between"
        >
          <div className="space-y-2 flex-1">
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-1/4 bg-slate-150 dark:bg-slate-850 rounded" />
          </div>
          <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export default function LiveInterviewLandingPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["audioStats"],
    queryFn: () => dashboardApi.getAudioStats().then((res) => res.data.data),
    staleTime: 5000,
  });

  function handleInitialize() {
    // The actual interview ID is created inside the LiveSessionPage's hook,
    // so we can just pass a temp ID here to satisfy the route param.
    navigate(routes.liveInterviewActive.replace(":sessionId", "new"));
  }

  const averageScore = data?.averageScore ?? 0;
  const totalCompleted = data?.totalCompleted ?? 0;
  const averageDuration = data?.averageDurationMinutes ?? 0;
  const averageVerbosity = data?.averageVerbosity ?? 0;
  const recentSessions = (data?.recentSessions ?? []).slice(0, 3);

  const statCards = [
    {
      label: "Average Score",
      icon: "star",
      value: totalCompleted > 0 ? `${Math.round(averageScore)}%` : "0%",
      description: "Overall mock performance",
    },
    {
      label: "Total Completed",
      icon: "history",
      value: `${totalCompleted}`,
      description: "Completed sessions count",
    },
    {
      label: "Average Duration",
      icon: "timer",
      value: totalCompleted > 0 ? `${Math.round(averageDuration * 10) / 10}m` : "0m",
      description: "Average minutes per mock",
    },
    {
      label: "Verbosity",
      icon: "graphic_eq",
      value: totalCompleted > 0 ? `${averageVerbosity}` : "0",
      description: "Words per session",
    },
  ];

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
        {isLoading ? (
          <StatCardsSkeleton />
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => (
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
                </div>
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  {card.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* ── Recent Sessions ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Sessions
          </h3>
          {isLoading ? (
            <RecentSessionsSkeleton />
          ) : recentSessions.length === 0 ? (
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-sm">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-4xl mb-2">
                mic_off
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                No sessions completed yet
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete your first live mock interview to see performance metrics here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentSessions.map((session) => (
                <a
                  key={session.id}
                  href="#"
                  className="group flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {session.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getRelativeTime(session.completedAt)} • Score: {session.score}/{session.maxScore}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 text-[20px]">
                    chevron_right
                  </span>
                </a>
              ))}
            </div>
          )}
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
