import StatCard from "./components/StatCard";
import TodayFocusBanner from "./components/TodayFocusBanner";
import RecentSessionsCard from "./components/RecentSessionsCard";
import ResumeContextCard from "./components/ResumeContextCard";
import {
  STAT_CARDS,
  RECENT_SESSIONS,
  RESUME_CONTEXT,
  TODAY_FOCUS,
} from "./constants";

// Placeholder — replace with real auth data
const USER_NAME = "Dino";
const STREAK_DAYS = 4;

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {USER_NAME} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Ready to crush your next technical interview?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="text-orange-500 font-bold text-lg">🔥</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                {STREAK_DAYS} Day Streak
              </span>
            </div>
            <button className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        {/* ── Today's focus banner ── */}
        <TodayFocusBanner {...TODAY_FOCUS} />

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {/* ── Recent sessions + Resume context ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RecentSessionsCard sessions={RECENT_SESSIONS} />
          <ResumeContextCard
            projects={RESUME_CONTEXT.projects}
            techStack={RESUME_CONTEXT.techStack}
          />
        </div>
      </div>
    </div>
  );
}
