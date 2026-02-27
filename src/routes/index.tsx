import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { routes } from "@/routes/paths";

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
import LiveInterviewLandingPage from "@/pages/liveInterview/LiveInterviewLanding";
import NotFoundPage from "@/pages/NotFoundPage";

const routeConfig: RouteObject[] = [
  // ── Public ────────────────────────────────────────────────────────────────
  { path: routes.home, element: <LandingPage /> },
  { path: routes.onboarding, element: <OnboardingPage /> },
  { path: routes.login, element: <LoginPage /> },

  // ── Focused / full-screen (no sidebar) ───────────────────────────────────
  { path: routes.practiceSession, element: <ActiveSessionPage /> },
  { path: routes.mockTestSession, element: <MockTestSessionPage /> },

  // ── Dashboard (shared Sidebar layout) ──────────────────────────────────────
  {
    element: <DashboardLayout />,
    children: [
      { path: routes.dashboard, element: <DashboardPage /> },
      { path: routes.practice, element: <PracticePage /> },
      { path: routes.mockTest, element: <MockTestPage /> },
      { path: routes.liveInterview, element: <LiveInterviewLandingPage /> },
      // { path: routes.analytics,     element: <AnalyticsPage /> },
      // { path: routes.profile,       element: <ProfilePage /> },
    ],
  },

  // ── Catch-all — 404 ─────────────────────────────────────────────────────────
  { path: "*", element: <NotFoundPage /> },
];

export default function AppRoutes() {
  return useRoutes(routeConfig);
}
