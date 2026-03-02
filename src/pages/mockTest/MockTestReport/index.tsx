import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";
import { mockTestApi } from "@/api/mockTest.api";
import type { MockTestData } from "@/models/mockTest";

export default function MockTestReportPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [testData, setTestData] = useState<MockTestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      if (!testId) return;
      try {
        setIsLoading(true);
        const response = await mockTestApi.get(testId);
        if (
          response.data.success &&
          response.data.data.status === "COMPLETED"
        ) {
          setTestData(response.data.data);
        } else if (response.data.data.status === "IN_PROGRESS") {
          // Test is still in progress
          navigate(routes.mockTestSession.replace(":testId", testId));
        } else {
          setError(response.data.message || "Could not load test report");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch test report");
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, [testId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">
            autorenew
          </span>
          <p className="font-medium animate-pulse">
            Analyzing your performance...
          </p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 gap-4">
        <span className="material-symbols-outlined text-red-500 justify-center text-5xl mb-2">
          error
        </span>
        <p className="text-red-500 font-medium text-lg">
          {error || "Test report not found"}
        </p>
        <button
          onClick={() => navigate(routes.mockTest)}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium shadow-sm shadow-primary/20 mt-2"
        >
          Return to Mock Tests
        </button>
      </div>
    );
  }

  const { metrics, skillsCovered, questions, durationSeconds } = testData;

  const m = durationSeconds ? Math.floor(durationSeconds / 60) : 0;
  const s = durationSeconds ? durationSeconds % 60 : 0;
  const timeDisplay = `${m}m ${s}s`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* -- Header Action -- */}
        <button
          onClick={() => navigate(routes.mockTest)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors group mb-4"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Mock Tests
        </button>

        {/* -- Overview Card -- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 dark:to-transparent rounded-[2rem] p-8 shrink-0 w-full md:w-auto relative overflow-hidden">
            <div className="absolute inset-0 border border-primary/20 dark:border-primary/10 rounded-[2rem]"></div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">
              Total Score
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                {metrics?.percentage || 0}
              </span>
              <span className="text-2xl font-bold text-slate-400">%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-2">
              {metrics?.score} / {metrics?.totalQuestions} Correct
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full h-full text-center">
            <div className="flex flex-col justify-center gap-1.5 p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-slate-400 text-3xl mb-1 mx-auto">
                timer
              </span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {timeDisplay}
              </span>
              <span className="text-sm font-medium text-slate-500">
                Duration
              </span>
            </div>
            <div className="flex flex-col justify-center gap-1.5 p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-slate-400 text-3xl mb-1 mx-auto">
                task_alt
              </span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {questions.filter((q) => q.isAnswered).length}
              </span>
              <span className="text-sm font-medium text-slate-500">
                Answered
              </span>
            </div>
          </div>
        </section>

        {/* -- Skill Breakdown -- */}
        {skillsCovered && skillsCovered.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              Skill Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skillsCovered.map((skill) => (
                <div
                  key={skill.skill}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between group hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {skill.skill}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {skill.correct} of {skill.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 w-10 text-right text-sm">
                      {Math.round(skill.accuracy)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -- Question Review -- */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white px-2">
            Detailed Review
          </h2>
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={q.questionId}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm overflow-hidden"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span
                    className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full font-bold text-sm ${q.isCorrect ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 mt-1">
                    <p className="font-medium text-slate-900 dark:text-white text-lg leading-snug">
                      {q.text}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400`}
                      >
                        {q.topic}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${q.difficulty === "Easy" ? "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400" : q.difficulty === "Hard" ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-6 opacity-90">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = q.selectedOptionIndex === oIdx;
                    const isCorrect = q.correctOptionIndex === oIdx;
                    let statusClass =
                      "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300";
                    let icon = null;

                    if (isCorrect) {
                      statusClass =
                        "border-green-500/50 bg-green-50/50 dark:bg-green-900/10 dark:border-green-500/30 text-green-800 dark:text-green-300 font-medium";
                      icon = (
                        <span className="material-symbols-outlined text-green-500 text-xl shrink-0 absolute right-4">
                          check_circle
                        </span>
                      );
                    } else if (isSelected) {
                      statusClass =
                        "border-red-500/50 bg-red-50/50 dark:bg-red-900/10 dark:border-red-500/30 text-red-800 dark:text-red-300 font-medium";
                      icon = (
                        <span className="material-symbols-outlined text-red-500 text-xl shrink-0 absolute right-4">
                          cancel
                        </span>
                      );
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`relative flex items-center p-4 rounded-xl transition-all ${statusClass}`}
                      >
                        <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold text-xs mr-4">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="pr-8">{opt}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
                    <div className="flex items-center gap-2 mb-2 text-indigo-800 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-lg">
                        lightbulb
                      </span>
                      <h4 className="font-bold text-sm uppercase tracking-wide">
                        Explanation
                      </h4>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
