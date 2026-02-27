export const routes = {
  // Public
  home: "/",
  login: "/login",
  onboarding: "/onboarding",

  // Protected
  dashboard: "/dashboard",
  mockTest: "/mock-test",
  mockTestSession: "/mock-test/session",
  mockTestReport: "/mock-test/report",
  liveInterview: "/live-interview",
  liveInterviewActive: "/live-interview/:sessionId",
  practice: "/practice",
  practiceSession: "/practice/:skillName",
  analytics: "/analytics",
  profile: "/profile",
} as const;
