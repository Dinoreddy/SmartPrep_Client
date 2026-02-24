export const routes = {
  // Public
  home: "/",
  login: "/login",
  register: "/register",

  // Protected
  dashboard: "/dashboard",
  mockTest: "/mock-test",
  mockTestActive: "/mock-test/:testId",
  liveInterview: "/live-interview",
  liveInterviewActive: "/live-interview/:sessionId",
  profile: "/profile",
} as const;
