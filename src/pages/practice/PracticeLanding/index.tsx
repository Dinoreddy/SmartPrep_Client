import { useNavigate } from "react-router-dom";
import WeakSkillBanner from "./components/WeakSkillBanner";
import SkillCard from "./components/SkillCard";
import AddSkillCard from "./components/AddSkillCard";
import { PAGE_META, WEAK_SKILL, SKILLS } from "./constants";
import { routes } from "@/routes/paths";

export default function PracticePage() {
  const navigate = useNavigate();

  function goToSession(skillName: string) {
    navigate(
      routes.practiceSession.replace(":skillName", skillName.toLowerCase()),
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {PAGE_META.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
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
      <div className="mb-12">
        <WeakSkillBanner {...WEAK_SKILL} />
      </div>

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
          {SKILLS.map((skill) => (
            <SkillCard
              key={skill.title}
              {...skill}
              onPractice={() => goToSession(skill.title)}
            />
          ))}
          <AddSkillCard />
        </div>
      </div>

      {/* Footer breathing room */}
      <div className="h-20" />
    </div>
  );
}
