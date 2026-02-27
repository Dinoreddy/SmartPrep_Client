import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { questionService } from "@/services/question.service";
import WeakSkillBanner from "./components/WeakSkillBanner";
import SkillCard from "./components/SkillCard";
import AddSkillCard from "./components/AddSkillCard";
import { PAGE_META, WEAK_SKILL } from "./constants";
import { routes } from "@/routes/paths";

export default function PracticePage() {
  const navigate = useNavigate();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["practiceStats"],
    queryFn: () => questionService.fetchPracticeStats(),
    refetchOnMount: "always",
    staleTime: 0,
  });

  function goToSession(skillName: string) {
    navigate(
      // We encode the URI component just in case a skill has spaces/special chars
      routes.practiceSession.replace(
        ":skillName",
        encodeURIComponent(skillName),
      ),
    );
  }
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {PAGE_META.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              {PAGE_META.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-amber-500">
              emoji_events
            </span>
            <span className="text-sm font-bold">
              Global Rank: #{PAGE_META.globalRank}
            </span>
          </div>
        </div>

        {/* ── Weak skill priority banner ── */}
        <WeakSkillBanner {...WEAK_SKILL} />

        {/* ── Skill mastery grid ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Skill Mastery
            </h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="text-secondary dark:text-gray-400">
                Loading stats...
              </p>
            ) : (
              stats.map((stat) => (
                <SkillCard
                  key={stat.name}
                  title={stat.name}
                  elo={stat.elo}
                  solved={stat.solved}
                  total={stat.total}
                  onPractice={() => goToSession(stat.name)}
                />
              ))
            )}
            <AddSkillCard />
          </div>
        </div>
      </div>
    </div>
  );
}
