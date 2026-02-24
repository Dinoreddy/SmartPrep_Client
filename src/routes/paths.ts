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
  profile: "/profile",
} as const;
