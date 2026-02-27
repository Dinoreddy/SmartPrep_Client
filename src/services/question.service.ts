/**
 * question.service.ts
 * ---------------
 * Business logic layer for questions/practice operations.
 * Calls questionApi to perform actions and returns formatted data.
 */

import { questionApi } from "@/api/question.api";
import type {
  FetchQuestionsParams,
  Question,
  SubmitAnswerPayload,
  SubmitAnswerResult,
  PracticeStat,
} from "@/models/question";

export const questionService = {
  /**
   * Fetch a batch of practice questions.
   */
  async fetchQuestions(params: FetchQuestionsParams): Promise<Question[]> {
    console.log("[question.service] fetchQuestions → params:", params);
    const response = await questionApi.getQuestions(params);
    console.log(
      "[question.service] fetchQuestions ← count:",
      response.data.data,
    );
    return response.data.data;
  },

  /**
   * Submit an answer to a practice question.
   */
  async submitAnswer(
    payload: SubmitAnswerPayload,
  ): Promise<SubmitAnswerResult> {
    console.log("[question.service] submitAnswer → payload:", payload);
    const response = await questionApi.submitAnswer(payload);
    console.log(
      "[question.service] submitAnswer ← response:",
      response.data.data,
    );
    return response.data.data;
  },

  /**
   * Fetch practice stats for the landing page.
   */
  async fetchPracticeStats(): Promise<PracticeStat[]> {
    console.log("[question.service] fetchPracticeStats →");
    const response = await questionApi.getPracticeStats();
    console.log(
      "[question.service] fetchPracticeStats ← data:",
      response.data.data,
    );
    return response.data.data;
  },
};
