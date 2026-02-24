import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { routes } from "./paths";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

// Add new routes here — no need to touch App.tsx
const routeConfig: RouteObject[] = [
  // Public routes
  {
    path: routes.home,
    element: <LandingPage />,
  },

  // Protected routes — uncomment and add pages as you build them
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  //     { path: routes.dashboard, element: <DashboardPage /> },
  //     { path: routes.mockTest, element: <MockTestPage /> },
  //     { path: routes.liveInterview, element: <LiveInterviewPage /> },
  //     { path: routes.profile, element: <ProfilePage /> },
  //   ],
  // },

  // Catch-all
  {
    path: "*",
    element: <LandingPage />,
  },
];

export default function AppRoutes() {
  return useRoutes(routeConfig);
}
