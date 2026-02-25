export const routes = {
  // Public
  home: "/",
  login: "/login",
  onboarding: "/onboarding",

  // Protected
  dashboard: "/dashboard",
  mockTest: "/mock-test",
  mockTestActive: "/mock-test/:testId",
  liveInterview: "/live-interview",
  liveInterviewActive: "/live-interview/:sessionId",
  practice: "/practice",
  analytics: "/analytics",
  profile: "/profile",
} as const;
