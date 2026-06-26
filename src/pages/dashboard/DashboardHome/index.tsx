import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/api/dashboard.api";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";

import StatCard from "./components/StatCard";
import TodayFocusBanner from "./components/TodayFocusBanner";
import RecentSessionsCard from "./components/RecentSessionsCard";
import ResumeContextCard from "./components/ResumeContextCard";

function FocusBannerSkeleton() {
  return (
    <div className="h-44 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-md" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

function RecentSessionsCardSkeleton() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col animate-pulse">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-16 bg-slate-150 dark:bg-slate-850 rounded" />
      </div>
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-1/4 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="text-right space-y-2">
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded ml-auto" />
              <div className="h-3 w-10 bg-slate-100 dark:bg-slate-800 rounded ml-auto" />
            </div>
          </div>
        ))}
      </div>
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

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  // Queries
  const { data: focusData, isLoading: isFocusLoading } = useQuery({
    queryKey: ["dashboardFocus"],
    queryFn: () => dashboardApi.getFocus().then((res) => res.data.data),
    staleTime: 5000,
  });

  const { data: statsData, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => dashboardApi.getStats().then((res) => res.data.data),
    staleTime: 5000,
  });

  const { data: recentSessionsData, isLoading: isRecentSessionsLoading } = useQuery({
    queryKey: ["dashboardRecentSessions"],
    queryFn: () => dashboardApi.getRecentSessions(3).then((res) => res.data.data),
    staleTime: 5000,
  });

  // Today Focus Props mapping
  const todayFocusProps = focusData
    ? {
        badge: "Today's Focus",
        badgeIcon: "calendar_today",
        title: focusData.skillName,
        description: focusData.recommendationDescription,
        ctaLabel: "Start Quick Practice",
        ctaIcon: "bolt",
        onStart: () =>
          navigate(
            routes.practiceSession.replace(
              ":skillName",
              encodeURIComponent(focusData.skillName)
            )
          ),
      }
    : {
        badge: "Get Started",
        badgeIcon: "rocket_launch",
        title: "Set Up Your Profile",
        description: "Upload a resume or manually add skills in your profile to start customized interview practice.",
        ctaLabel: "Edit Profile",
        ctaIcon: "arrow_forward",
        onStart: () => navigate(routes.profile),
      };

  // Stat cards mapping
  const statCards = statsData
    ? [
        {
          icon: "trending_up",
          iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
          iconColor: "text-indigo-600 dark:text-indigo-400",
          label: "Average Skill Elo",
          value: `${statsData.averageElo}`,
          badge: `${statsData.eloDelta >= 0 ? "+" : ""}${statsData.eloDelta} pts`,
        },
        {
          icon: "target",
          iconBg: "bg-blue-50 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          label: "Practice Accuracy",
          value: `${statsData.practiceAccuracy}%`,
          badge: `From ${statsData.totalQuestionsAnswered} questions`,
        },
        {
          icon: "mic",
          iconBg: "bg-violet-50 dark:bg-violet-900/30",
          iconColor: "text-violet-600 dark:text-violet-400",
          label: "Voice Mocks Completed",
          value: `${statsData.voiceMocksCompleted}`,
          badge: `Avg Score: ${statsData.averageVoiceScore}/100`,
        },
      ]
    : [];

  // Recent Sessions mapper
  const formattedSessions = (recentSessionsData || []).map((session) => {
    const isVoice = session.sessionType === "voice";
    return {
      icon: isVoice ? "record_voice_over" : "bolt",
      iconBg: isVoice ? "bg-orange-100 dark:bg-orange-900/30" : "bg-blue-100 dark:bg-blue-900/30",
      iconColor: isVoice ? "text-orange-600 dark:text-orange-400" : "text-blue-600 dark:text-blue-400",
      title: session.title,
      subtitle: `${isVoice ? "Voice Session" : "MCQ Practice"} • ${getRelativeTime(
        session.completedAt
      )}`,
      score: isVoice ? `${session.score}/${session.maxScore}` : `${session.score}%`,
      scoreLabel: isVoice ? "Score" : "Accuracy",
    };
  });

  // Extract Resume Context values directly from user profile (capped for summary layout)
  const resumeProjects = (user?.resumeProfile?.projects?.map((p) => p.name) || []).slice(0, 2);
  const resumeSkills = (user?.resumeProfile?.skills || []).slice(0, 6);

  return (
    <div className="p-8 font-display">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.fullName || user?.username} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
              Ready to crush your next technical interview?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        {/* ── Today's focus banner ── */}
        {isFocusLoading ? (
          <FocusBannerSkeleton />
        ) : (
          <TodayFocusBanner {...todayFocusProps} />
        )}

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isStatsLoading
            ? [1, 2, 3].map((i) => <StatCardSkeleton key={i} />)
            : statCards.map((card) => <StatCard key={card.label} {...card} />)}
        </div>

        {/* ── Recent sessions + Resume context ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {isRecentSessionsLoading ? (
            <RecentSessionsCardSkeleton />
          ) : (
            <RecentSessionsCard sessions={formattedSessions} />
          )}
          <ResumeContextCard projects={resumeProjects} techStack={resumeSkills} />
        </div>
      </div>
    </div>
  );
}
