import { useState, useRef, useEffect } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none"); // "none" | "elo-asc" | "elo-desc"
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortOpen]);

  function goToSession(skillName: string) {
    navigate(
      // We encode the URI component just in case a skill has spaces/special chars
      routes.practiceSession.replace(
        ":skillName",
        encodeURIComponent(skillName),
      ),
    );
  }

  // Find the skill with the lowest ELO
  const lowestEloSkill =
    stats && stats.length > 0
      ? [...stats].sort((a, b) => a.elo - b.elo)[0]
      : null;

  function getEloStatus(elo: number): string {
    if (elo < 800) return "Needs Practice";
    if (elo < 1200) return "Needs Improvement";
    if (elo < 1600) return "Developing";
    return "Proficient";
  }

  const bannerProps = lowestEloSkill
    ? {
        label: "Priority Focus",
        labelIcon: "warning",
        title: lowestEloSkill.name,
        elo: lowestEloSkill.elo,
        eloStatus: getEloStatus(lowestEloSkill.elo),
        description: `Focusing on your weakest areas yields the highest return on investment for your interview prep. Practicing ${lowestEloSkill.name} will help boost your Elo rating.`,
        ctaLabel: `Start Practice: ${lowestEloSkill.name}`,
        onStart: () => goToSession(lowestEloSkill.name),
        isLoading: false,
      }
    : {
        label: WEAK_SKILL.label,
        labelIcon: WEAK_SKILL.labelIcon,
        title: WEAK_SKILL.title,
        elo: WEAK_SKILL.elo,
        eloStatus: WEAK_SKILL.eloStatus,
        description: WEAK_SKILL.description,
        ctaLabel: WEAK_SKILL.ctaLabel,
        onStart: () => goToSession(WEAK_SKILL.title),
        isLoading: isLoading,
      };

  // Filter and sort stats
  const processedStats = (() => {
    let result = stats ? [...stats] : [];

    // 1. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((stat) => stat.name.toLowerCase().includes(query));
    }

    // 2. Sort by ELO asc / desc
    if (sortBy === "elo-asc") {
      result.sort((a, b) => a.elo - b.elo);
    } else if (sortBy === "elo-desc") {
      result.sort((a, b) => b.elo - a.elo);
    }

    return result;
  })();

  return (
    <div className="p-8 font-display">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {PAGE_META.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
              {PAGE_META.subtitle}
            </p>
          </div>
        </div>

        {/* ── Weak skill priority banner ── */}
        <WeakSkillBanner {...bannerProps} />

        {/* ── Skill mastery grid ── */}
        <div className="space-y-6">
          {/* Section Header with Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Skill Mastery
            </h3>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial flex items-center">
                <span className="absolute left-3.5 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[22px] select-none pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setSortOpen(!sortOpen)}
                  className="w-full md:w-56 px-4 py-3 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-between gap-2 cursor-pointer focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500 select-none">
                      sort
                    </span>
                    {sortBy === "none" && "Sort: Default"}
                    {sortBy === "elo-asc" && "Elo: Low to High"}
                    {sortBy === "elo-desc" && "Elo: High to Low"}
                  </span>
                  <span className={`material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-slate-950/80 overflow-hidden z-50 animate-fade-in-up py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("none");
                        setSortOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                        sortBy === "none"
                          ? "bg-primary/5 text-primary dark:bg-primary/10 dark:text-primary"
                          : "text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                      }`}
                    >
                      <span>Sort: Default</span>
                      {sortBy === "none" && (
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("elo-asc");
                        setSortOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                        sortBy === "elo-asc"
                          ? "bg-primary/5 text-primary dark:bg-primary/10 dark:text-primary"
                          : "text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                      }`}
                    >
                      <span>Elo: Low to High</span>
                      {sortBy === "elo-asc" && (
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("elo-desc");
                        setSortOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                        sortBy === "elo-desc"
                          ? "bg-primary/5 text-primary dark:bg-primary/10 dark:text-primary"
                          : "text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                      }`}
                    >
                      <span>Elo: High to Low</span>
                      {sortBy === "elo-desc" && (
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          check
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="text-secondary dark:text-gray-400 col-span-full">
                Loading stats...
              </p>
            ) : processedStats.length === 0 ? (
              <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                <span className="material-symbols-outlined text-slate-350 dark:text-slate-650 text-4xl block">search_off</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
                  No skills found matching "{searchQuery}"
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs">
                  Try adjusting your search query.
                </p>
              </div>
            ) : (
              processedStats.map((stat) => (
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
            <AddSkillCard onAdd={() => navigate(routes.profile)} />
          </div>
        </div>
      </div>
    </div>
  );
}
