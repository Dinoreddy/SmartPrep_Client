import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { routes } from "@/routes/paths";
import { analyticsApi } from "@/api/analytics.api";

function RadarSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-72 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
      <div className="flex justify-center items-center h-[350px]">
        <div className="size-60 rounded-full border-4 border-dashed border-slate-200 dark:border-slate-800 animate-[spin_6s_linear_infinite] flex items-center justify-center">
          <div className="size-40 rounded-full border-4 border-dashed border-slate-150 dark:border-slate-800/80" />
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
      <div className="space-y-2">
        <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3.5 w-56 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-950/20 rounded-xl flex items-end p-4 gap-3">
        <div className="h-[40%] flex-1 bg-slate-200/60 dark:bg-slate-800 rounded-t" />
        <div className="h-[75%] flex-1 bg-slate-200/60 dark:bg-slate-800 rounded-t" />
        <div className="h-[55%] flex-1 bg-slate-200/60 dark:bg-slate-800 rounded-t" />
        <div className="h-[90%] flex-1 bg-slate-200/60 dark:bg-slate-800 rounded-t" />
        <div className="h-[30%] flex-1 bg-slate-200/60 dark:bg-slate-800 rounded-t" />
      </div>
    </div>
  );
}

/* ── Custom Pop-up Tooltips ── */

function RadarTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { subject, score } = payload[0].payload;

    let level = "Needs Practice";
    let levelColor = "text-red-500 dark:text-red-400";
    if (score >= 1600) {
      level = "Proficient";
      levelColor = "text-emerald-500 dark:text-emerald-400";
    } else if (score >= 1200) {
      level = "Developing";
      levelColor = "text-indigo-500 dark:text-indigo-400";
    } else if (score >= 800) {
      level = "Needs Improvement";
      levelColor = "text-amber-500 dark:text-amber-400";
    }

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-xl flex flex-col gap-1 text-left min-w-[150px]">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Skill Competency
        </p>
        <h4 className="text-sm font-black text-slate-900 dark:text-white capitalize">
          {subject}
        </h4>
        <div className="h-px bg-slate-100 dark:bg-slate-850 my-1" />
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Elo Rating: <span className="font-extrabold text-slate-950 dark:text-white">{score}</span>
        </p>
        <p className={`text-[11px] font-bold ${levelColor}`}>
          {level}
        </p>
      </div>
    );
  }
  return null;
}

function TrajectoryTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { date, score } = payload[0].payload;

    let status = "Needs Review";
    let statusColor = "text-red-500 dark:text-red-400";
    if (score >= 80) {
      status = "Excellent";
      statusColor = "text-emerald-500 dark:text-emerald-400";
    } else if (score >= 60) {
      status = "Solid Attempt";
      statusColor = "text-amber-500 dark:text-amber-400";
    }

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-xl flex flex-col gap-1 text-left min-w-[150px]">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Mock Test Score
        </p>
        <h4 className="text-sm font-black text-slate-900 dark:text-white">
          {date}
        </h4>
        <div className="h-px bg-slate-100 dark:bg-slate-850 my-1" />
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Accuracy: <span className="font-extrabold text-emerald-500 dark:text-emerald-400">{score}%</span>
        </p>
        <p className={`text-[11px] font-bold ${statusColor}`}>
          {status}
        </p>
      </div>
    );
  }
  return null;
}

function VoiceTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { date, score } = payload[0].payload;

    let status = "Developing";
    let statusColor = "text-amber-500 dark:text-amber-400";
    if (score >= 85) {
      status = "Expert Speaker";
      statusColor = "text-emerald-500 dark:text-emerald-400";
    } else if (score >= 70) {
      status = "Fluent";
      statusColor = "text-indigo-500 dark:text-indigo-400";
    }

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-xl flex flex-col gap-1 text-left min-w-[150px]">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          AI Voice Evaluation
        </p>
        <h4 className="text-sm font-black text-slate-900 dark:text-white">
          {date}
        </h4>
        <div className="h-px bg-slate-100 dark:bg-slate-850 my-1" />
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Score: <span className="font-extrabold text-indigo-500 dark:text-indigo-400">{score}/100</span>
        </p>
        <p className={`text-[11px] font-bold ${statusColor}`}>
          {status}
        </p>
      </div>
    );
  }
  return null;
}

export default function AnalyticsPage() {
  const navigate = useNavigate();

  // Independent timeline range states
  const [trajectoryRange, setTrajectoryRange] = useState("30d");
  const [voiceRange, setVoiceRange] = useState("30d");

  // Fetch charts data dynamically mapping each separate parameter filter
  const { data, isLoading } = useQuery({
    queryKey: ["analyticsCharts", trajectoryRange, voiceRange],
    queryFn: () =>
      analyticsApi.getCharts(trajectoryRange, voiceRange).then((res) => res.data.data),
    staleTime: 5000,
  });

  const radarData = data?.radarData || [];
  const trajectoryData = data?.trajectoryData || [];
  const voicePerformanceData = data?.voicePerformanceData || [];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* ── Page Header ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Actionable Analytics
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
              Understand your performance trends and domain mastery levels.
            </p>
          </div>
        </header>

        {/* ── Skill Proficiency Radar Chart ── */}
        {isLoading ? (
          <RadarSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Skill Proficiency Mapping
              </h3>
              <p className="text-sm text-slate-400 mt-0.5 font-medium">
                Your current ELO ratings mapped across multiple technical competencies
              </p>
            </div>
            {radarData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[350px] text-center p-6 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">
                  architecture
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  No skill proficiencies found. Start practice sessions or take tests to build your Elo map.
                </p>
              </div>
            ) : (
              <div className="h-[400px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 12, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 2000]}
                      tick={{ fontSize: 10, fontWeight: 600 }}
                    />
                    <Tooltip content={<RadarTooltip />} />
                    <Radar
                      name="Proficiency"
                      dataKey="score"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.2}
                      dot={{ r: 4, stroke: "#8b5cf6", strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 6 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* ── Mock Test Trajectory (Area Chart) ── */}
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Mock Test Trajectory
                </h3>
                <p className="text-sm text-slate-400 mt-0.5 font-medium">
                  MCQ mock test accuracy scores over time
                </p>
              </div>
              <select
                value={trajectoryRange}
                onChange={(e) => setTrajectoryRange(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
            {trajectoryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-2">
                  assignment
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Take your first mock test to generate this chart!
                </p>
                <button
                  onClick={() => navigate(routes.mockTest)}
                  className="mt-3.5 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  Start Mock Test
                </button>
              </div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trajectoryData}
                    margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTrajectory" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fontWeight: 700 }}
                      stroke="#cbd5e1"
                      tickLine={false}
                      dy={8}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 11, fontWeight: 750 }}
                      stroke="#cbd5e1"
                      tickLine={false}
                      dx={-8}
                    />
                    <Tooltip content={<TrajectoryTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorTrajectory)"
                      dot={{ r: 4, stroke: "#10b981", strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* ── Voice Interview Score History (Bar Chart) ── */}
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Voice Interview Score History
                </h3>
                <p className="text-sm text-slate-400 mt-0.5 font-medium">
                  AI-graded scores of chronological voice sessions
                </p>
              </div>
              <select
                value={voiceRange}
                onChange={(e) => setVoiceRange(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
            {voicePerformanceData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 bg-slate-50/50 dark:bg-slate-800/10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-2">
                  record_voice_over
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Complete your first voice session to generate this chart!
                </p>
                <button
                  onClick={() => navigate(routes.liveInterview)}
                  className="mt-3.5 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  Start Voice Session
                </button>
              </div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={voicePerformanceData}
                    margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fontWeight: 700 }}
                      stroke="#cbd5e1"
                      tickLine={false}
                      dy={8}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 11, fontWeight: 750 }}
                      stroke="#cbd5e1"
                      tickLine={false}
                      dx={-8}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(99, 102, 241, 0.05)", radius: 6 }}
                      content={<VoiceTooltip />}
                    />
                    <Bar dataKey="score" fill="url(#colorVoice)" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
