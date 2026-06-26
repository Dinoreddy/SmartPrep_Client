export const routes = {
  // Public
  home: "/",
  login: "/login",
  onboarding: "/onboarding",

  // Protected
  dashboard: "/dashboard",
  mockTest: "/mock-test",
  mockTestSession: "/mock-test/session/:testId",
  mockTestReport: "/mock-test/report/:testId",
  liveInterview: "/live-interview",
  liveInterviewActive: "/live-interview/:sessionId",
  liveInterviewReport: "/live-interview/report/:sessionId",
  practice: "/practice",
  practiceSession: "/practice/:skillName",
  analytics: "/analytics",
  profile: "/profile",
} as const;
