import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-slate-50 dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-background-dark">
        <Outlet />
      </main>
    </div>
  );
}
