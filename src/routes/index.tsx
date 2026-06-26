import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { routes } from "@/routes/paths";

// Guards
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PublicOnlyRoute from "@/components/guards/PublicOnlyRoute";
import ResumeGuard from "@/components/guards/ResumeGuard";

// Public pages
import LandingPage from "@/pages/LandingPage";
import OnboardingPage from "@/pages/OnboardingPage";
import LoginPage from "@/pages/LoginPage";

// Dashboard layout + pages
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/dashboard/DashboardHome";
import PracticePage from "@/pages/practice/PracticeLanding";
import MockTestPage from "@/pages/mockTest/MockTestLanding";
import ActiveSessionPage from "@/pages/practice/ActiveSession";
import MockTestSessionPage from "@/pages/mockTest/MockTestSession";
import MockTestReportPage from "@/pages/mockTest/MockTestReport";
import LiveInterviewLandingPage from "@/pages/liveInterview/LiveInterviewLanding";
import { LiveSessionPage } from "@/pages/liveInterview/LiveSession/LiveSessionPage";
import LiveInterviewReportPage from "@/pages/liveInterview/LiveInterviewReport";
import NotFoundPage from "@/pages/NotFoundPage";
import AnalyticsPage from "@/pages/analytics";
import ProfilePage from "@/pages/profile";

const routeConfig: RouteObject[] = [
  // ── Public-only (redirect to /dashboard if already logged in) ─────────────
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: routes.home, element: <LandingPage /> },
      { path: routes.login, element: <LoginPage /> },
      { path: routes.onboarding, element: <OnboardingPage /> },
    ],
  },

  // ── Protected (redirect to /login if not logged in) ───────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      // ResumeGuard: redirect to /onboarding (Step 2) if resume not uploaded
      {
        element: <ResumeGuard />,
        children: [
          // Focused / full-screen sessions (no sidebar)
          { path: routes.practiceSession, element: <ActiveSessionPage /> },
          { path: routes.mockTestSession, element: <MockTestSessionPage /> },
          { path: routes.mockTestReport, element: <MockTestReportPage /> },
          { path: routes.liveInterviewActive, element: <LiveSessionPage /> },
          { path: routes.liveInterviewReport, element: <LiveInterviewReportPage /> },

          // Dashboard layout (shared sidebar)
          {
            element: <DashboardLayout />,
            children: [
              { path: routes.dashboard, element: <DashboardPage /> },
              { path: routes.practice, element: <PracticePage /> },
              { path: routes.mockTest, element: <MockTestPage /> },
              {
                path: routes.liveInterview,
                element: <LiveInterviewLandingPage />,
              },
              { path: routes.analytics,    element: <AnalyticsPage /> },
              { path: routes.profile,      element: <ProfilePage /> },
            ],
          },
        ],
      },
    ],
  },

  // ── Catch-all — 404 ───────────────────────────────────────────────────────
  { path: "*", element: <NotFoundPage /> },
];

export default function AppRoutes() {
  return useRoutes(routeConfig);
}
