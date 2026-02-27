import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "@/routes/paths";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { icon: "home", label: "Home", to: routes.dashboard, fill: true },
  {
    icon: "sensors",
    label: "Real Time Interview",
    to: routes.liveInterview,
    fill: false,
  },
  { icon: "quiz", label: "Mock Tests", to: routes.mockTest, fill: false },
  {
    icon: "track_changes",
    label: "Practice",
    to: routes.practice,
    fill: false,
  },
  { icon: "analytics", label: "Analytics", to: routes.analytics, fill: false },
] as const;

const ACTIVE_CLS =
  "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors";
const INACTIVE_CLS =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium";

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout, isPending } = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <aside className="w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between p-6">
      {/* Top: Logo + Nav */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight">
              SmartPrep AI
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
              Interview Platform
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === routes.dashboard}
              className={({ isActive }) =>
                isActive ? ACTIVE_CLS : INACTIVE_CLS
              }
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined
                }
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom: User section */}
      <div className="relative" ref={menuRef}>
        {/* Settings dropdown menu */}
        {menuOpen && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/60 dark:shadow-slate-900/60 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Account
              </p>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              disabled={isPending}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              {isPending ? "Logging out…" : "Log out"}
            </button>
          </div>
        )}

        {/* User card */}
        <div className="flex items-center gap-3 px-2 py-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          {/* Avatar initials */}
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">
              {user?.fullName
                ? user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "?"}
            </span>
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user?.fullName ?? "—"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">
              {user?.role ?? "—"}
            </p>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Account settings"
            aria-expanded={menuOpen}
            className={`ml-auto transition-colors ${
              menuOpen
                ? "text-primary"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
