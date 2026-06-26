import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { routes } from "@/routes/paths";
import HeroBanner from "./components/HeroBanner";
import MockStatCard from "./components/MockStatCard";
import MockTestRow from "./components/MockTestRow";
import SkillSelectModal from "./components/SkillSelectModal";
import { mockTestApi } from "@/api/mockTest.api";
import type { MockTestSkill } from "@/models/mockTest";
import { PAGE_META, HERO } from "./constants";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatSkillsTitle(skills: string[]): string {
  if (!skills || skills.length === 0) return "General Mock Test";
  if (skills.length === 1) return `${skills[0]} Mock`;
  if (skills.length === 2) return `${skills[0]} & ${skills[1]} Mock`;
  return `${skills[0]}, ${skills[1]} +${skills.length - 2} Mock`;
}

export default function MockTestPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState<MockTestSkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the dynamic mock test metrics and recent history from the backend
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["mockTestStats"],
    queryFn: () => mockTestApi.getStats().then((res) => res.data.data),
    refetchOnMount: "always",
    staleTime: 0,
  });

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await mockTestApi.getConfig();
        if (response.data.success) {
          setSkills(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load skills.");
      }
    }
    fetchConfig();
  }, []);

  async function handleStartTest(selectedSkills: string[]) {
    try {
      setIsLoading(true);
      const response = await mockTestApi.start({ selectedSkills });
      if (response.data.success) {
        const testId = response.data.data._id || response.data.data.testId;
        setShowModal(false);
        navigate(routes.mockTestSession.replace(":testId", testId as string), {
          state: { selectedSkills },
        });
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to start test.");
    } finally {
      setIsLoading(false);
    }
  }

  const dynamicStatCards = [
    {
      icon: "assignment",
      label: "Total Tests",
      value: stats ? String(stats.totalTests) : "0",
      badge: "Lifetime tests taken",
      palette: {
        bg: "bg-white dark:bg-slate-900",
        border: "border-blue-100 dark:border-blue-800/30",
        iconColor: "text-blue-500",
        labelColor: "text-blue-900 dark:text-blue-200",
        badgeColor: "text-blue-600/80 dark:text-blue-400",
      },
    },
    {
      icon: "analytics",
      label: "Avg Score",
      value: stats ? String(stats.averageScore) : "0",
      valueSuffix: "%",
      badge: "Across all subjects",
      palette: {
        bg: "bg-white dark:bg-slate-900",
        border: "border-purple-100 dark:border-purple-800/30",
        iconColor: "text-purple-500",
        labelColor: "text-purple-900 dark:text-purple-200",
        badgeColor: "text-purple-600/80 dark:text-purple-400",
      },
    },
    {
      icon: "verified",
      label: "Strongest Skill",
      value: stats ? stats.strongestSkill : "N/A",
      badge: "Highest proficiency rating",
      palette: {
        bg: "bg-white dark:bg-slate-900",
        border: "border-emerald-100 dark:border-emerald-800/30",
        iconColor: "text-emerald-500",
        labelColor: "text-emerald-900 dark:text-emerald-200",
        badgeColor: "text-emerald-600/80 dark:text-emerald-400",
      },
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Header ── */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {PAGE_META.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {PAGE_META.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        {/* ── Hero ── */}
        <HeroBanner {...HERO} onStart={() => setShowModal(true)} />

        {/* ── Stat cards ── */}
        {isStatsLoading ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/30 animate-pulse space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="size-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-8 w-16 bg-slate-300 dark:bg-slate-600 rounded" />
                <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicStatCards.map((card) => (
              <MockStatCard key={card.label} {...card} />
            ))}
          </section>
        )}

        {/* ── Recent mock tests ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Mock Tests
            </h3>
          </div>

          {isStatsLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/30 animate-pulse flex justify-between items-center h-24 animate-[pulse_1.5s_ease-in-out_infinite]"
                >
                  <div className="space-y-3 flex-1">
                    <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="flex gap-2">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                  </div>
                  <div className="h-8 w-12 bg-slate-300 dark:bg-slate-600 rounded" />
                </div>
              ))}
            </div>
          ) : stats?.recentTests && stats.recentTests.length > 0 ? (
            <div className="grid gap-4">
              {stats.recentTests.map((test) => (
                <MockTestRow
                  key={test.id}
                  title={formatSkillsTitle(test.skillsInvolved)}
                  time={formatDate(test.date)}
                  tags={test.skillsInvolved}
                  score={test.score}
                  onViewReport={() =>
                    navigate(routes.mockTestReport.replace(":testId", test.id))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3 block">
                assignment_turned_in
              </span>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                You haven't taken any mock tests yet!
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-sm transition-all"
              >
                Start Your First Test
              </button>
            </div>
          )}
        </section>

        {/* ── Skill selection modal ── */}
        {showModal && (
          <SkillSelectModal
            skills={skills.map((s) => ({ name: s.skill, elo: s.elo }))}
            onStart={handleStartTest}
            onClose={() => setShowModal(false)}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
