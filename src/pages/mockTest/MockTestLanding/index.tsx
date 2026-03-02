import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";
import HeroBanner from "./components/HeroBanner";
import MockStatCard from "./components/MockStatCard";
import MockTestRow from "./components/MockTestRow";
import SkillSelectModal from "./components/SkillSelectModal";
import { mockTestApi } from "@/api/mockTest.api";
import type { MockTestSkill } from "@/models/mockTest";
import {
  PAGE_META,
  HERO,
  MOCK_STAT_CARDS,
  RECENT_MOCK_TESTS,
} from "./constants";

export default function MockTestPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState<MockTestSkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_STAT_CARDS.map((card) => (
            <MockStatCard key={card.label} {...card} />
          ))}
        </section>

        {/* ── Recent mock tests ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Mock Tests
            </h3>
            <a
              href="#"
              className="text-sm font-semibold text-primary hover:text-purple-700 flex items-center gap-1 group"
            >
              View All History
              <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="grid gap-4">
            {RECENT_MOCK_TESTS.map((test) => (
              <MockTestRow key={test.title} {...test} />
            ))}
          </div>
        </section>

        {/* ── Skill selection modal ── */}
        {showModal && (
          <SkillSelectModal
            skills={skills.map((s) => ({ name: s.skill, elo: s.elo }))}
            onStart={handleStartTest}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
