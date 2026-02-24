import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./paths";
// import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  //   const user = useAuthStore((state) => state.user);

  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }

  return <Outlet />;
}
