/**
 * question.api.ts
 * -----------
 * Raw HTTP calls for the questions/practice domain.
 * No side-effects, no store interaction — just axios + types.
 */

import api from "@/lib/axios";
import type {
  FetchQuestionsParams,
  FetchQuestionsResponse,
  SubmitAnswerPayload,
  SubmitAnswerResponse,
  PracticeStatsResponse,
} from "@/models/question";

export const questionApi = {
  /**
   * GET /questions
   * Fetches practice questions based on the user's current Elo rating for that specific topic.
   */
  getQuestions: (params: FetchQuestionsParams) =>
    api.get<FetchQuestionsResponse>("/questions", { params }),

  /**
   * POST /questions/submit
   * Submits an answer for a specific question, recalculates Elo, and returns the result.
   */
  submitAnswer: (payload: SubmitAnswerPayload) =>
    api.post<SubmitAnswerResponse>("/questions/submit", payload),

  /**
   * GET /questions/stats
   * Fetches practice stats for the UI.
   */
  getPracticeStats: () => api.get<PracticeStatsResponse>("/questions/stats"),
};
