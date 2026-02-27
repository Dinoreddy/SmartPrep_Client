/**
 * PublicOnlyRoute
 * ---------------
 * Wraps routes that should only be accessible when NOT logged in
 * (landing page, login, onboarding).
 * If the user is already authenticated, redirect straight to /dashboard —
 * EXCEPT on /onboarding, which an authenticated user may still need to visit
 * (e.g. completing resume upload after registration).
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";

export default function PublicOnlyRoute() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (user && location.pathname !== routes.onboarding) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return <Outlet />;
}
