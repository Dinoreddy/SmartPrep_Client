/**
 * ResumeGuard
 * -----------
 * Sits inside ProtectedRoute (user is guaranteed to be logged in here).
 * If the user hasn't uploaded a resume yet, bounce them to Step 2 of
 * onboarding so they complete the required setup before accessing the app.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";

export default function ResumeGuard() {
  const user = useAuthStore((s) => s.user);
  console.log(user);
  const location = useLocation();

  if (user && !user.resumeProfile.hasUploaded) {
    return (
      <Navigate
        to={routes.onboarding}
        state={{ step: 2, from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
