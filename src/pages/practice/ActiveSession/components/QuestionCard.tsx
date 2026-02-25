import type { Difficulty } from "@/models/question";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
};

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

interface QuestionCardProps {
  question: string;
  difficulty: Difficulty;
  currentIndex: number;
  totalQuestions: number;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  selectedAnswer: number | null;
  peeked: boolean;
  answered: boolean;
  onAnswerSelect: (index: number) => void;
  onPeek: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  question,
  difficulty,
  currentIndex,
  totalQuestions,
  options,
  correctOptionIndex,
  explanation,
  selectedAnswer,
  peeked,
  answered,
  onAnswerSelect,
  onPeek,
  onNext,
  canGoNext,
  isLastQuestion,
}: QuestionCardProps) {
  const locked = answered || peeked;
  const isCorrect = answered && selectedAnswer === correctOptionIndex;
  const nextLabel =
    isLastQuestion && (answered || peeked) ? "Finish Session" : "Next Question";
  const nextIcon =
    isLastQuestion && (answered || peeked) ? "check_circle" : "arrow_forward";

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* ── Meta row ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${DIFFICULTY_STYLES[difficulty]}`}
        >
          {difficulty}
        </span>
        <span className="text-slate-400 text-xs font-medium">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* ── Question text ────────────────────────────────────────── */}
      <h1 className="text-lg md:text-xl font-extrabold leading-snug text-slate-900 dark:text-white shrink-0">
        {question}
      </h1>

      {/* ── Options ─────────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-4 "
        role="radiogroup"
        aria-label="Answer options"
      >
        {options.map((optionText, index) => {
          const label = OPTION_LABELS[index] ?? String(index + 1);
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === correctOptionIndex;

          // --- Style derivation ---
          let rowClass =
            "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 hover:bg-slate-50 hover:shadow-sm";
          let badgeClass =
            "border-2 border-slate-300 dark:border-slate-600 text-slate-400";
          let textClass =
            "text-slate-700 dark:text-slate-200 group-hover:text-slate-900";
          let badgeContent: React.ReactNode = label;
          let opacity = "";

          if (answered) {
            if (isCorrectOption) {
              // Mint / success style matching the mockup
              rowClass =
                "border-[3px] border-mint-border bg-mint-bg/40 dark:bg-success/10 shadow-sm";
              badgeClass = "bg-success text-white border-0 shadow-sm";
              badgeContent = (
                <span className="material-symbols-outlined text-[16px]">
                  check
                </span>
              );
              textClass = "text-slate-900 dark:text-white font-bold";
            } else if (isSelected) {
              rowClass = "border-2 border-red-400 bg-red-50 dark:bg-red-900/20";
              badgeClass = "bg-red-400 text-white border-0";
              badgeContent = (
                <span className="material-symbols-outlined text-[16px]">
                  close
                </span>
              );
              textClass = "text-red-700 dark:text-red-300";
            } else {
              opacity = "opacity-50";
            }
          } else if (peeked) {
            opacity = "opacity-50";
          } else if (isSelected) {
            rowClass =
              "border-2 border-primary bg-primary/5 dark:bg-primary/10";
            badgeClass = "border-2 border-primary text-primary bg-primary/10";
            textClass = "text-primary";
          }

          return (
            <button
              key={index}
              role="radio"
              aria-checked={isSelected}
              disabled={locked}
              onClick={() => !locked && onAnswerSelect(index)}
              className={`group flex items-center p-2.5 rounded-xl border-2 text-left transition-all duration-150 ${rowClass} ${opacity} ${locked ? "cursor-default" : "cursor-pointer"}`}
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs mr-3 shrink-0 transition-colors ${badgeClass}`}
              >
                {badgeContent}
              </div>
              <span
                className={`flex-1 font-medium text-sm md:text-base transition-colors ${textClass}`}
              >
                {optionText}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Bottom section — conditional on state ───────────────── */}
      {!answered && !peeked ? (
        /* PRE-ANSWER: "View Explanation" left + "Next" right, same row, vertically centred */
        <div className="shrink-0 flex items-center justify-between gap-3 pt-1">
          <button
            onClick={onPeek}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              lightbulb
            </span>
            View Explanation
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-sm transition-all ${
              canGoNext
                ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
          >
            Submit
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        </div>
      ) : (
        /* POST-ANSWER / POST-PEEK: rich result section */
        <div className="shrink-0 flex flex-col items-center gap-3 pt-2">
          {peeked ? (
            /* Peek state — same layout as answered, amber warning title, no Elo */
            <>
              <h2 className="text-2xl font-extrabold tracking-tight text-amber-500">
                Explanation
              </h2>

              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  warning
                </span>
                This question will not be scored
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-center max-w-lg">
                {explanation}
              </p>
            </>
          ) : (
            /* Answered state — Correct / Incorrect result card */
            <>
              <h2
                className={`text-2xl font-extrabold tracking-tight ${isCorrect ? "text-success" : "text-red-500"}`}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-center max-w-lg">
                {explanation}
              </p>

              <div
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                  isCorrect
                    ? "bg-success/10 border-success/20 text-success"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400"
                }`}
              >
                <span className="material-symbols-outlined text-[16px] mr-1.5">
                  {isCorrect ? "trending_up" : "trending_down"}
                </span>
                {isCorrect ? "+14 Elo" : "−8 Elo"}
              </div>
            </>
          )}

          {/* Next / Finish button — always full-width in post-reveal */}
          <button
            onClick={onNext}
            className="w-full sm:max-w-xs h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {nextLabel}
            <span className="material-symbols-outlined text-[18px]">
              {nextIcon}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
