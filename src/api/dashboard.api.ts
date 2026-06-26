/**
 * dashboard.api.ts
 * ----------------
 * Raw HTTP calls for the dashboard home page.
 */

import api from "@/lib/axios";
import type { ApiResponse } from "@/models/auth";
import type {
  FocusResponseData,
  StatsResponseData,
  RecentSession,
  AudioStatsResponseData,
} from "@/models/dashboard";

export const dashboardApi = {
  /**
   * GET /dashboard/focus
   * Retrieve today's focus recommendation for the user.
   */
  getFocus: () =>
    api.get<ApiResponse<FocusResponseData | null>>("/dashboard/focus"),

  /**
   * GET /dashboard/stats
   * Retrieve learning stats summaries.
   */
  getStats: () =>
    api.get<ApiResponse<StatsResponseData>>("/dashboard/stats"),

  /**
   * GET /dashboard/recent-sessions
   * Retrieve list of recent voice tests and practice runs.
   */
  getRecentSessions: (limit = 3) =>
    api.get<ApiResponse<RecentSession[]>>(`/dashboard/recent-sessions?limit=${limit}`),

  /**
   * GET /dashboard/audio-stats
   * Retrieve stats and recent sessions for audio interview dashboard.
   */
  getAudioStats: () =>
    api.get<ApiResponse<AudioStatsResponseData>>("/dashboard/audio-stats"),
};
