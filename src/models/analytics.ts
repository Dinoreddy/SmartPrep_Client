export interface RadarChartItem {
  subject: string;
  score: number;
  fullMark: number;
}

export interface TrajectoryChartItem {
  date: string;
  score: number;
}

export interface VoicePerformanceChartItem {
  date: string;
  score: number;
}

export interface AnalyticsChartsData {
  radarData: RadarChartItem[];
  trajectoryData: TrajectoryChartItem[];
  voicePerformanceData: VoicePerformanceChartItem[];
}

export interface AnalyticsChartsResponse {
  success: boolean;
  message: string;
  data: AnalyticsChartsData;
}
