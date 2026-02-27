import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/routes/paths";
import TestHeader from "./components/TestHeader";
import TestQuestionCard from "./components/TestQuestionCard";
import type { Difficulty } from "@/models/question";

// ── Types ─────────────────────────────────────────────────────────────────────
interface TestQuestion {
  _id: string;
  text: string;
  difficulty: Difficulty;
  options: string[];
  skillName: string;
}

// ── Mock questions (replace with API response) ────────────────────────────────
const MOCK_TEST_QUESTIONS: TestQuestion[] = [
  {
    _id: "tq1",
    text: "What does the virtual DOM in React primarily help with?",
    difficulty: "Medium",
    options: [
      "Directly manipulating the browser's real DOM",
      "Minimizing expensive DOM updates via diffing",
      "Storing component state between renders",
      "Fetching data from a server",
    ],
    skillName: "React",
  },
  {
    _id: "tq2",
    text: "Which lifecycle method in a class component is called after every render?",
    difficulty: "Easy",
    options: [
      "componentWillMount",
      "componentDidMount",
      "componentDidUpdate",
      "shouldComponentUpdate",
    ],
    skillName: "React",
  },
  {
    _id: "tq3",
    text: "In Node.js, which module provides an event-driven mechanism?",
    difficulty: "Easy",
    options: ["http", "fs", "EventEmitter", "stream"],
    skillName: "NodeJS",
  },
  {
    _id: "tq4",
    text: "What is the purpose of the Event Loop in Node.js?",
    difficulty: "Medium",
    options: [
      "To run CPU-intensive tasks in parallel",
      "To handle asynchronous I/O callbacks on a single thread",
      "To synchronize multiple Node processes",
      "To manage memory allocation",
    ],
    skillName: "NodeJS",
  },
  {
    _id: "tq5",
    text: "Which SQL clause is used to filter aggregate results?",
    difficulty: "Easy",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    skillName: "SQL",
  },
];

const TOTAL_SECONDS = 20 * 60; // 20 minutes

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MockTestSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Selected skills passed via navigation state; fall back to all mock questions
  const selectedSkills: string[] = location.state?.selectedSkills ?? [];

  const questions =
    selectedSkills.length > 0
      ? MOCK_TEST_QUESTIONS.filter((q) => selectedSkills.includes(q.skillName))
      : MOCK_TEST_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start the countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswerSelect(index: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = index;
      return next;
    });
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleFinish();
    }
  }

  function handleFinish() {
    clearInterval(timerRef.current!);
    // Navigate to report page, pass answers + questions for scoring
    navigate(routes.mockTestReport, {
      state: { questions, answers },
      replace: true,
    });
  }

  function handleAbandon() {
    clearInterval(timerRef.current!);
    navigate(routes.mockTest, { replace: true });
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500 dark:text-slate-400">
        No questions found for the selected skills.
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLowTime = timeLeft <= 5 * 60; // red when ≤ 5 min left

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <TestHeader
        timeDisplay={formatTime(timeLeft)}
        isLowTime={isLowTime}
        onAbandon={handleAbandon}
      />

      <main className="flex-1 overflow-hidden w-full">
        <div className="h-full max-w-3xl mx-auto px-6 py-6 flex flex-col">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col overflow-auto">
            <TestQuestionCard
              key={currentQuestion._id}
              question={currentQuestion.text}
              difficulty={currentQuestion.difficulty}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              options={currentQuestion.options}
              selectedAnswer={answers[currentIndex]}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
              isLastQuestion={currentIndex === questions.length - 1}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
