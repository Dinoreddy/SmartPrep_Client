import api from "@/lib/axios";
import type { AnalyticsChartsResponse } from "@/models/analytics";

export const analyticsApi = {
  /** GET /api/v1/analytics/charts - Fetches aggregated statistics and chart trajectories */
  getCharts: (trajectoryTimeRange: string, voiceTimeRange: string) =>
    api.get<AnalyticsChartsResponse>("/analytics/charts", {
      params: { trajectoryTimeRange, voiceTimeRange },
    }),
};
