import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { routes } from "./paths";

// Public pages
import LandingPage from "../pages/LandingPage";
import OnboardingPage from "../pages/OnboardingPage";
import LoginPage from "../pages/LoginPage";

// Dashboard layout + pages
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import PracticePage from "../pages/PracticePage";

import ProtectedRoute from "./ProtectedRoute";

const routeConfig: RouteObject[] = [
  // ── Public ────────────────────────────────────────────────────────────────
  { path: routes.home, element: <LandingPage /> },
  { path: routes.onboarding, element: <OnboardingPage /> },
  { path: routes.login, element: <LoginPage /> },

  // ── Dashboard (shared Sidebar layout) ──────────────────────────────────────
  {
    element: <DashboardLayout />,
    children: [
      { path: routes.dashboard, element: <DashboardPage /> },
      { path: routes.practice, element: <PracticePage /> },
      // Add more dashboard pages here as you build them:
      // { path: routes.liveInterview, element: <LiveInterviewPage /> },
      // { path: routes.mockTest,      element: <MockTestPage /> },
      // { path: routes.analytics,     element: <AnalyticsPage /> },
      // { path: routes.profile,       element: <ProfilePage /> },
    ],
  },

  // ── Catch-all ──────────────────────────────────────────────────────────────
  { path: "*", element: <LandingPage /> },
];

export default function AppRoutes() {
  return useRoutes(routeConfig);
}
