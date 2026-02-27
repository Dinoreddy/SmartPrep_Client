import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { routes } from "@/routes/paths";
import { questionService } from "@/services/question.service";
import type { Question } from "@/models/question";
import { useAuthStore } from "@/store/authStore";
import SessionHeader from "./components/SessionHeader";
import QuestionCard from "./components/QuestionCard";

const MOCK_STREAK = 0; // We will use 0 for now until streak API is built

export default function ActiveSessionPage() {
  const { skillName: rawSkillName = "react" } = useParams<{
    skillName: string;
  }>();
  // Decode the URL param so backend gets EXACT casing e.g. "MongoDB" not "MongoDB"
  const skillName = decodeURIComponent(rawSkillName);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Derive initial Elo for this specific topic from the user model (default 1000)
  const initialElo = user?.skillElo?.[skillName] || 1000;

  // All loaded questions in this session
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  // Unique session ID to prevent React Query from serving stale cached questions
  const sessionId = useRef(Date.now()).current;

  // Initial fetch on mount
  const {
    isLoading,
    isError,
    data: initialData,
  } = useQuery({
    queryKey: ["practiceQuestions", skillName, "initial", sessionId],
    queryFn: () =>
      questionService.fetchQuestions({ topic: skillName, limit: 5 }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // Sync initial query into state exactly once when it loads
  useEffect(() => {
    if (initialData && allQuestions.length === 0) {
      setAllQuestions(initialData);
    }
  }, [initialData]);

  // Background fetch generator when running low
  const fetchMoreMutation = useMutation({
    mutationFn: () =>
      questionService.fetchQuestions({ topic: skillName, limit: 5 }),
    onSuccess: (newQuestions) => {
      // Filter out any duplicates just in case the backend sent them
      setAllQuestions((prev) => {
        const existingIds = new Set(prev.map((q) => q._id || (q as any).id));
        const uniqueNew = newQuestions.filter(
          (q) => !existingIds.has(q._id || (q as any).id),
        );
        return [...prev, ...uniqueNew];
      });
    },
  });

  // Submit answer mutation
  const submitMutation = useMutation({
    mutationFn: questionService.submitAnswer,
    onSuccess: (data) => {
      // Assuming newElo is provided in response, we'll update the local elo state
      setCurrentElo(data.newElo);
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [peeked, setPeeked] = useState(false);

  // Track Elo iteratively as the user answers
  const [currentElo, setCurrentElo] = useState(initialElo);

  // Sync currentElo if initialElo loads/changes (e.g. hydration)
  useEffect(() => {
    setCurrentElo(initialElo);
  }, [initialElo]);

  const currentQuestion = allQuestions[currentIndex] as Question | undefined;
  // Session never ends naturally anymore, user must click "Exit" in header
  const isLastQuestion = false;
  const canGoNext = selectedAnswer !== null || peeked || answered;

  function advance() {
    submitMutation.reset(); // clear eloChange result from the previous question
    setSelectedAnswer(null);
    setAnswered(false);
    setPeeked(false);
    if (!isLastQuestion) {
      setCurrentIndex((i) => {
        const nextIndex = i + 1;
        // If we just moved to the 2nd to last question and aren't already fetching...
        if (
          nextIndex === allQuestions.length - 2 &&
          !fetchMoreMutation.isPending
        ) {
          fetchMoreMutation.mutate();
        }
        return nextIndex;
      });
    } else {
      // This block is technically unreachable now since isLastQuestion = false,
      // but we keep it just in case we ever add a natural end state limit.
      navigate(routes.practice);
    }
  }

  function handleNext() {
    if (peeked || answered) {
      advance();
      return;
    }
    if (selectedAnswer !== null && currentQuestion) {
      setAnswered(true);

      submitMutation.mutate({
        questionId: currentQuestion._id || (currentQuestion as any).id,
        selectedOptionIndex: selectedAnswer,
      });
      return;
    }
  }

  function handlePeek() {
    setPeeked(true);
    setSelectedAnswer(null);
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary"
        />
      </div>
    );
  }

  if (isError || !currentQuestion) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark space-y-4">
        <p className="text-secondary dark:text-gray-400">
          Failed to load questions or no questions available.
        </p>
        <button
          onClick={() => navigate(routes.practice)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    // Full viewport, no overflow — everything must fit
    <div className="h-screen flex flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <SessionHeader
        skillName={skillName}
        streak={MOCK_STREAK}
        elo={currentElo}
        currentQuestion={currentIndex + 1}
        totalQuestions={allQuestions.length}
        onExit={() => navigate(routes.practice)}
      />

      {/* Content fills remaining height, no scroll */}
      <main className="flex-1 overflow-hidden w-full mt-10">
        <div className="h-full max-w-3xl mx-auto px-6 py-4 flex flex-col">
          <QuestionCard
            key={currentQuestion._id || (currentQuestion as any).id}
            question={currentQuestion.text}
            difficulty={currentQuestion.difficulty}
            currentIndex={currentIndex}
            totalQuestions={allQuestions.length}
            options={currentQuestion.options}
            correctOptionIndex={currentQuestion.correctOptionIndex}
            explanation={currentQuestion.explanation}
            selectedAnswer={selectedAnswer}
            answered={answered}
            peeked={peeked}
            onAnswerSelect={setSelectedAnswer}
            onPeek={handlePeek}
            onNext={handleNext}
            canGoNext={canGoNext && !submitMutation.isPending}
            isLastQuestion={isLastQuestion}
            eloChange={submitMutation.data?.eloChange}
          />
        </div>
      </main>
    </div>
  );
}
