/**
 * dashboard.ts
 * ------------
 * TypeScript models for the dashboard domain.
 */

export interface FocusResponseData {
  skillName: string;
  currentElo: number;
  recommendationDescription: string;
}

export interface StatsResponseData {
  averageElo: number;
  eloDelta: number;
  practiceAccuracy: number;
  totalQuestionsAnswered: number;
  voiceMocksCompleted: number;
  averageVoiceScore: number;
}

export interface RecentSession {
  id: string;
  sessionType: "voice" | "practice";
  title: string;
  completedAt: string;
  score: number;
  maxScore: number;
}

export interface AudioStatsResponseData {
  averageScore: number;
  totalCompleted: number;
  averageDurationMinutes: number;
  averageVerbosity: number;
  recentSessions: Array<{
    id: string;
    sessionType: "voice";
    title: string;
    completedAt: string;
    score: number;
    maxScore: number;
  }>;
}

export interface SessionReportTranscriptEntry {
  role: "assistant" | "user";
  content: string;
}

export interface SessionReportData {
  id: string;
  status: "ACTIVE" | "COMPLETED" | "ABANDONED";
  score: number | null;
  feedback: string | null;
  startedAt: string;
  completedAt: string | null;
  durationMinutes: number | null;
  totalUserWords: number;
  transcript: SessionReportTranscriptEntry[];
}
