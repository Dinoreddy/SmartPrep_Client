import type { Difficulty } from "@/models/question";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
};

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

interface TestQuestionCardProps {
  question: string;
  difficulty: Difficulty;
  currentIndex: number;
  totalQuestions: number;
  options: string[];
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function TestQuestionCard({
  question,
  difficulty,
  currentIndex,
  totalQuestions,
  options,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  isLastQuestion,
}: TestQuestionCardProps) {
  const canGoNext = selectedAnswer !== null;
  const nextLabel = isLastQuestion ? "Finish Test" : "Next Question";
  const nextIcon = isLastQuestion ? "check_circle" : "arrow_forward";

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* ── Meta row ─────────────────────────────────────────────── */}
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

      {/* ── Question text ─────────────────────────────────────────── */}
      <h1 className="text-lg md:text-xl font-extrabold leading-snug text-slate-900 dark:text-white shrink-0">
        {question}
      </h1>

      {/* ── Options ──────────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-3 flex-1"
        role="radiogroup"
        aria-label="Answer options"
      >
        {options.map((optionText, index) => {
          const label = OPTION_LABELS[index] ?? String(index + 1);
          const isSelected = selectedAnswer === index;

          const rowClass = isSelected
            ? "border-2 border-primary bg-primary/5 dark:bg-primary/10"
            : "border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 hover:bg-slate-50 hover:shadow-sm";
          const badgeClass = isSelected
            ? "border-2 border-primary text-primary bg-primary/10"
            : "border-2 border-slate-300 dark:border-slate-600 text-slate-400";
          const textClass = isSelected
            ? "text-primary"
            : "text-slate-700 dark:text-slate-200 group-hover:text-slate-900";

          return (
            <button
              key={index}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onAnswerSelect(index)}
              className={`group flex items-center p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${rowClass}`}
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs mr-3 shrink-0 transition-colors ${badgeClass}`}
              >
                {label}
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

      {/* ── Submit / Next row ─────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-end pt-1">
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            canGoNext
              ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          }`}
        >
          {nextLabel}
          <span className="material-symbols-outlined text-[16px]">
            {nextIcon}
          </span>
        </button>
      </div>
    </div>
  );
}
