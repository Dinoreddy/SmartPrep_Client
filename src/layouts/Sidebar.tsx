import { NavLink } from "react-router-dom";
import { routes } from "../routes/paths";

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

// Placeholder user — swap for real auth store data when ready
const USER = {
  name: "Dino Y",
  role: "User",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3hwwL7wY4rsKVhAn008M0VXPglRfkBxoktnLHl-EoI34NkeQeirlk6NaTYs9GII3L3oJ2VX0qmX7Zo7pL16RbATUy42VyCot3tjVZ2WvbBAyIX9PDdRUryxvRbi2UKJmIXKnHC6aoizW9QpYg2Yn0Sq-ddBBGl7ndCy_MAP39AajI_PbztI-hee4IdcXq7Bl30ELuRLPd8hYssYSsUz94ryAx0HP5_PGHpMf1quJAn8LKprzehSaP0SQ5UVPF2pLY-LMHOe_9iCb",
};

const ACTIVE_CLS =
  "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors";
const INACTIVE_CLS =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium";

export default function Sidebar() {
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
      <div className="flex items-center gap-3 px-2 py-3 border-t border-slate-100 dark:border-slate-800 pt-6">
        <div
          className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url('${USER.avatar}')` }}
          aria-label="User profile picture"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {USER.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {USER.role}
          </p>
        </div>
        <button className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            settings
          </span>
        </button>
      </div>
    </aside>
  );
}
