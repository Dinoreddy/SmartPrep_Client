import { useState, useMemo } from "react";

export interface SkillOption {
  name: string;
  elo: number;
}

interface SkillSelectModalProps {
  skills: SkillOption[];
  onStart: (selectedSkills: string[]) => void;
  onClose: () => void;
}

export default function SkillSelectModal({
  skills,
  onStart,
  onClose,
}: SkillSelectModalProps) {
  const [selected, setSelected] = useState<string[]>(
    // pre-select the first two skills by default
    skills.slice(0, 2).map((s) => s.name),
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      skills.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [skills, query],
  );

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal card */}
      <div className="relative w-full max-w-[600px] bg-white dark:bg-[#1e1629] rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Customize Your Mock Test
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* ── Search ───────────────────────────────────────────────── */}
        <div className="px-8 pt-5 pb-2 shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>

        {/* ── Skill list ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-2">
            Your Profile Skills
          </p>

          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">
              No skills match "{query}"
            </p>
          )}

          <div className="space-y-1">
            {filtered.map((skill) => {
              const isSelected = selected.includes(skill.name);
              return (
                <label
                  key={skill.name}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 hover:bg-primary/10 dark:hover:bg-primary/20"
                      : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Custom checkbox */}
                    <div className="relative flex items-center shrink-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggle(skill.name)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 checked:bg-primary checked:border-primary transition-all focus:ring-2 focus:ring-primary/30 focus:ring-offset-0"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                        <span className="material-symbols-outlined text-base scale-70 block">
                          check
                        </span>
                      </span>
                    </div>

                    <span
                      className={`text-sm font-medium transition-colors ${
                        isSelected
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>

                  {/* Elo badge */}
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 text-primary border-slate-100 dark:border-slate-700 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent"
                    }`}
                  >
                    Elo: {skill.elo}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => selected.length > 0 && onStart(selected)}
            disabled={selected.length === 0}
            className={`flex items-center gap-2.5 py-2.5 px-7 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
              selected.length > 0
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Start Test</span>
            {selected.length > 0 && (
              <span className="bg-white/20 text-white text-xs py-0.5 px-2 rounded-full font-medium">
                {selected.length} selected
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
