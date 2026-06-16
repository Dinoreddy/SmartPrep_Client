import api from "@/lib/axios";

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
};
