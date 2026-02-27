import { useState } from "react";

interface TestHeaderProps {
  timeDisplay: string; // e.g. "19:42" — formatted by parent
  isLowTime?: boolean; // turn timer red when time is low
  onAbandon: () => void;
}

export default function TestHeader({
  timeDisplay,
  isLowTime = false,
  onAbandon,
}: TestHeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 grid grid-cols-3 items-center">
          {/* ── Left: Abandon button ─────────────────────────────── */}
          <div className="flex items-center">
            <button
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold
                text-red-500 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                border border-red-200 dark:border-red-800/50
                transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
              Abandon
            </button>
          </div>

          {/* ── Center: Title ─────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">
              quiz
            </span>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Mock Test
            </span>
          </div>

          {/* ── Right: Timer ──────────────────────────────────────── */}
          <div className="flex items-center justify-end">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono font-bold text-sm tabular-nums transition-colors ${
                isLowTime
                  ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-500"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[16px] ${isLowTime ? "text-red-500" : "text-slate-500"}`}
              >
                timer
              </span>
              {timeDisplay}
            </div>
          </div>
        </div>
      </header>

      {/* ── Abandon confirmation modal ────────────────────────────── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowConfirm(false)}
        >
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto">
              <span className="material-symbols-outlined text-red-500 text-[24px]">
                warning
              </span>
            </div>

            {/* Text */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Abandon this test?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Your progress will be lost and the test will not be scored. This
                action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Going
              </button>
              <button
                onClick={onAbandon}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md shadow-red-500/20 transition-colors"
              >
                Yes, Abandon
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
