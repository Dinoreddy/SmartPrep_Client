import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";
import { getQuestionsForSkill } from "./constants";
import SessionHeader from "./components/SessionHeader";
import QuestionCard from "./components/QuestionCard";

const MOCK_STREAK = 3;
const MOCK_ELO = 1450;

export default function ActiveSessionPage() {
  const { skillName = "react" } = useParams<{ skillName: string }>();
  const navigate = useNavigate();

  const questions = getQuestionsForSkill(skillName);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [peeked, setPeeked] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoNext = selectedAnswer !== null || peeked || answered;

  function advance() {
    setSelectedAnswer(null);
    setAnswered(false);
    setPeeked(false);
    if (!isLastQuestion) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigate(routes.practice);
    }
  }

  function handleNext() {
    if (peeked || answered) {
      advance();
      return;
    }
    if (selectedAnswer !== null) {
      setAnswered(true);
      return;
    }
  }

  function handlePeek() {
    setPeeked(true);
    setSelectedAnswer(null);
  }

  return (
    // Full viewport, no overflow — everything must fit
    <div className="h-screen flex flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <SessionHeader
        skillName={skillName}
        streak={MOCK_STREAK}
        elo={MOCK_ELO}
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        onExit={() => navigate(routes.practice)}
      />

      {/* Content fills remaining height, no scroll */}
      <main className="flex-1 overflow-hidden w-full mt-10">
        <div className="h-full max-w-3xl mx-auto px-6 py-4 flex flex-col">
          <QuestionCard
            key={currentQuestion._id}
            question={currentQuestion.text}
            difficulty={currentQuestion.difficulty}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            options={currentQuestion.options}
            correctOptionIndex={currentQuestion.correctOptionIndex}
            explanation={currentQuestion.explanation}
            selectedAnswer={selectedAnswer}
            answered={answered}
            peeked={peeked}
            onAnswerSelect={setSelectedAnswer}
            onPeek={handlePeek}
            onNext={handleNext}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </main>
    </div>
  );
}
