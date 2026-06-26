import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "@/api/interview.api";
import { routes } from "@/routes/paths";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  return "text-rose-500";
}

function getScoreRingColor(score: number): string {
  if (score >= 80) return "#10b981"; // emerald-500
  if (score >= 60) return "#f59e0b"; // amber-500
  return "#f43f5e"; // rose-500
}

function getScoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Proficient";
  if (score >= 55) return "Developing";
  return "Needs Work";
}

function formatDuration(minutes: number | null): string {
  if (minutes === null) return "—";
  if (minutes < 1) return "< 1 min";
  return `${Math.round(minutes)} min`;
}

// ── Score Ring ────────────────────────────────────────────────────────────────

interface ScoreRingProps {
  score: number;
}

function ScoreRing({ score }: ScoreRingProps) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (score / 100);
  const dashArray = `${filled} ${circumference - filled}`;
  const color = getScoreRingColor(score);

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span className={`text-4xl font-black tracking-tight ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
          / 100
        </span>
      </div>
    </div>
  );
}

// ── Skeleton Components ───────────────────────────────────────────────────────

function ReportSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 font-display">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 animate-pulse flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2 w-full max-w-sm">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 animate-pulse">
              <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
              <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
              <div className="h-12 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Grading Pending State ─────────────────────────────────────────────────────

function GradingPending() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      {/* Animated pulse ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping" />
        <span className="absolute inset-2 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDelay: "0.3s" }} />
        <span className="material-symbols-outlined text-indigo-500 text-4xl relative z-10 animate-pulse">
          psychology
        </span>
      </div>
      <div className="text-center">
        <p className="text-base font-bold text-slate-900 dark:text-white">
          Your report is being generated
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
          Our AI is analysing your interview transcript. This usually takes under 30 seconds.
        </p>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LiveInterviewReportPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["interviewReport", sessionId],
    queryFn: () => interviewApi.getReport(sessionId!).then((res) => res.data.data),
    enabled: !!sessionId,
    // Poll every 10 seconds until score is available
    refetchInterval: (query) => {
      const d = query.state.data;
      if (!d || d.score === null) return 10000;
      return false;
    },
    staleTime: 0,
  });

  if (isLoading) return <ReportSkeleton />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 gap-5">
        <span className="material-symbols-outlined text-rose-500 text-5xl">error</span>
        <p className="text-rose-500 font-semibold text-lg">
          {(error as any)?.response?.data?.message || "Session report not found."}
        </p>
        <button
          onClick={() => navigate(routes.liveInterview)}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium shadow-sm"
        >
          Back to Live Sessions
        </button>
      </div>
    );
  }

  const isPending = data.score === null;
  const transcript = data.transcript ?? [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 font-display">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Back Nav ── */}
        <button
          onClick={() => navigate(routes.liveInterview)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-[20px]">
            arrow_back
          </span>
          Back to Live Sessions
        </button>

        {/* ── Score + Feedback Card ── */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Header gradient band */}
          <div
            className="relative overflow-hidden px-8 pt-8 pb-6 flex flex-col items-center text-center gap-5"
            style={{ background: "radial-gradient(ellipse at top, #0f172a, #020617)" }}
          >
            {/* Glow blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

            {isPending ? (
              <GradingPending />
            ) : (
              <>
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-300/70">
                    Interview Score
                  </p>
                  <ScoreRing score={data.score!} />
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      data.score! >= 80
                        ? "text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20"
                        : data.score! >= 60
                        ? "text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20"
                        : "text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20"
                    }`}
                  >
                    {getScoreLabel(data.score!)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Feedback */}
          {data.feedback && (
            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <h3 className="text-sm font-bold uppercase tracking-wider">AI Feedback</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {data.feedback}
              </p>
            </div>
          )}
        </section>

        {/* ── Metrics Strip ── */}
        <section className="grid grid-cols-3 gap-4">
          {[
            {
              icon: "timer",
              label: "Duration",
              value: formatDuration(data.durationMinutes),
            },
            {
              icon: "record_voice_over",
              label: "Words Spoken",
              value: `${data.totalUserWords.toLocaleString()} words`,
            },
            {
              icon: "task_alt",
              label: "Status",
              value: data.status === "COMPLETED" ? "Completed" : data.status === "ABANDONED" ? "Abandoned" : "Active",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col items-center text-center gap-1"
            >
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-2xl mb-1">
                {stat.icon}
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ── Transcript Panel ── */}
        {transcript.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">chat</span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Transcript
              </h2>
              <span className="ml-auto text-xs text-slate-400">
                {transcript.length} messages
              </span>
            </div>

            {/* Chat log */}
            <div className="p-6 flex flex-col gap-4 max-h-[600px] overflow-y-auto">
              {transcript.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
                  >
                    {/* Role label */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">
                      {isUser ? "You" : "Alex (Interviewer)"}
                    </span>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-br-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={() => navigate(routes.liveInterview)}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Back to Live Sessions
          </button>
          <button
            onClick={() =>
              navigate(routes.liveInterviewActive.replace(":sessionId", "new"))
            }
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
            Start New Session
          </button>
        </div>
      </div>
    </div>
  );
}
