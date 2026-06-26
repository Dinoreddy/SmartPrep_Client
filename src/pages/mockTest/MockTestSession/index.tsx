import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "@/routes/paths";
import TestHeader from "./components/TestHeader";
import TestQuestionCard from "./components/TestQuestionCard";
import { mockTestApi } from "@/api/mockTest.api";
import type { MockTestQuestion } from "@/models/mockTest";

const TOTAL_SECONDS = 20 * 60; // 20 minutes

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function MockTestSessionPage() {
  const navigate = useNavigate();
  const { testId } = useParams<{ testId: string }>();

  const [questions, setQuestions] = useState<MockTestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchTest() {
      if (!testId) return;
      try {
        setIsLoading(true);
        const response = await mockTestApi.get(testId);
        if (response.data.success) {
          const fetchedQuestions = response.data.data.questions || [];
          setQuestions(fetchedQuestions);
          // Restore previously selected answers if resuming IN_PROGRESS test
          const initialAnswers: Record<string, number> = {};
          fetchedQuestions.forEach((q) => {
            if (
              q.selectedOptionIndex !== undefined &&
              q.selectedOptionIndex !== null
            ) {
              initialAnswers[q.questionId] = q.selectedOptionIndex;
            }
          });
          setAnswers(initialAnswers);
          // Optional: handle durationSeconds / sync timer
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch test");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (isLoading || questions.length === 0) return;
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
  }, [isLoading, questions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswerSelect(index: number) {
    const questionId = questions[currentIndex].questionId;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: index,
    }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleFinish();
    }
  }

  async function handleFinish() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!testId) return;
    try {
      const response = await mockTestApi.submit(testId, { answers });
      if (response.data.success) {
        navigate(routes.mockTestReport.replace(":testId", testId), {
          replace: true,
        });
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit test");
    }
  }

  function handleAbandon() {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate(routes.mockTest, { replace: true });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Loading test session...
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500 font-medium">
          {error || "No questions found."}
        </p>
        <button
          onClick={() => navigate(routes.mockTest)}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
        >
          Go Back
        </button>
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
              key={currentQuestion.questionId}
              question={currentQuestion.text}
              difficulty={currentQuestion.difficulty}
              topic={currentQuestion.topic}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              options={currentQuestion.options}
              selectedAnswer={answers[currentQuestion.questionId] ?? null}
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
