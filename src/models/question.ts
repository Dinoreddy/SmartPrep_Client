/** Shared types for questions and practice sessions. */

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: Difficulty;
  eloRating: number;
  topics: string[];
}

export interface FetchQuestionsParams {
  topic: string;
  limit?: number;
}

export interface FetchQuestionsResponse {
  success: boolean;
  message: string;
  data: Question[];
}

export interface PracticeStat {
  name: string;
  elo: number;
  total: number;
  solved: number;
}

export interface PracticeStatsResponse {
  success: boolean;
  message: string;
  data: PracticeStat[];
}

export interface SubmitAnswerPayload {
  questionId: string;
  selectedOptionIndex: number;
}

export interface SubmitAnswerResult {
  isCorrect: boolean;
  correctOptionIndex: number;
  explanation: string;
  topic: string;
  newElo: number;
  eloChange: number;
}

export interface SubmitAnswerResponse {
  success: boolean;
  message: string;
  data: SubmitAnswerResult;
}
