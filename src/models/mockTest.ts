import type { Difficulty } from "./question";

export interface MockTestSkill {
  skill: string;
  elo: number;
  status: "Weak" | "Average" | "Strong";
}

export interface MockTestConfigResponse {
  success: boolean;
  message: string;
  data: MockTestSkill[];
}

export interface StartMockTestPayload {
  selectedSkills: string[];
}

export interface MockTestQuestion {
  questionId: string;
  text: string;
  options: string[];
  topic: string;
  difficulty: Difficulty;
  correctOptionIndex?: number; // Only present in COMPLETED state
  selectedOptionIndex?: number | null;
  isAnswered?: boolean;
  isCorrect?: boolean;
  explanation?: string; // Only present in COMPLETED state
}

export interface MockTestMetrics {
  score: number;
  totalQuestions: number;
  percentage: number;
}

export interface MockTestSkillBreakdown {
  skill: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface MockTestData {
  _id?: string; // Sometimes returned instead of testId on create
  testId?: string;
  status: "IN_PROGRESS" | "COMPLETED";
  startedAt?: string;
  completedAt?: string | null;
  durationSeconds?: number | null;
  metrics?: MockTestMetrics;
  skillsCovered?: MockTestSkillBreakdown[];
  questions: MockTestQuestion[];
  totalQuestions?: number;
}

export interface StartMockTestResponse {
  success: boolean;
  message: string;
  data: MockTestData;
}

export interface GetMockTestResponse {
  success: boolean;
  message: string;
  data: MockTestData;
}

export interface SubmitMockTestPayload {
  answers: Record<string, number>;
}

export interface SubmitMockTestResponse {
  success: boolean;
  message: string;
  data: {
    testId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
  };
}

export interface RecentMockTestItem {
  id: string;
  date: string;
  score: number;
  skillsInvolved: string[];
}

export interface MockTestStatsData {
  totalTests: number;
  averageScore: number;
  strongestSkill: string;
  recentTests: RecentMockTestItem[];
}

export interface GetMockTestStatsResponse {
  success: boolean;
  message: string;
  data: MockTestStatsData;
}
