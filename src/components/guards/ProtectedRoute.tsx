/**
 * ProtectedRoute
 * --------------
 * Wraps routes that require authentication.
 * If the user is not logged in, redirects to /login.
 * Preserves the attempted URL in `state` so we can redirect back after login if needed.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
