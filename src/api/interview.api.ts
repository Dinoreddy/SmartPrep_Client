import api from "@/lib/axios";
import type { ApiResponse } from "@/models/auth";
import type { SessionReportData } from "@/models/dashboard";

export interface StartInterviewResponse {
  success: boolean;
  message: string;
  data: {
    interviewId: string;
    initialAudio: string; // Base64 PCM
    initialMessage: string; // Text transcript of initial audio
    encoding: string;
    sampleRate: number;
  };
}

export const interviewApi = {
  /**
   * POST /interview/start
   * Creates the session, generates the opening question, and returns base64 audio.
   */
  start: () => api.post<StartInterviewResponse>("/interview/start"),

  /**
   * GET /interview/:interviewId/report
   * Fetch the completed session report including score, feedback, and transcript.
   */
  getReport: (interviewId: string) =>
    api.get<ApiResponse<SessionReportData>>(`/interview/${interviewId}/report`),
};
