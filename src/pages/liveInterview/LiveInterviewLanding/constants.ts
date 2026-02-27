// ── Stat cards ────────────────────────────────────────────────────────────────
export const LIVE_STAT_CARDS = [
  {
    label: "Accuracy",
    icon: "check_circle",
    value: "88%",
    badge: "+5.2%",
    badgeColor:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    description: "Technical precision score",
  },
  {
    label: "Communication",
    icon: "forum",
    value: "92%",
    badge: "+2.1%",
    badgeColor:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    description: "Clarity & articulation",
  },
  {
    label: "Pacing",
    icon: "speed",
    value: "145",
    badge: "WPM",
    badgeColor:
      "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
    description: "Words per minute avg",
  },
  {
    label: "Filler Words",
    icon: "graphic_eq",
    value: "12",
    badge: "Stable",
    badgeColor:
      "text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400",
    description: "Detected hesitations",
  },
] as const;

// ── Loaded context topics ─────────────────────────────────────────────────────
export const CONTEXT_TOPICS = [
  { icon: "code", label: "System Design" },
  { icon: "terminal", label: "React Hooks" },
  { icon: "database", label: "SQL Optimization" },
] as const;

// ── Suggested questions ───────────────────────────────────────────────────────
export const SUGGESTED_QUESTIONS = [
  "Explain the difference between optimistic and pessimistic concurrency control.",
  "How would you design a rate limiter for a distributed API?",
  "Describe the useEffect dependency array pitfalls.",
] as const;

// ── Recent sessions ───────────────────────────────────────────────────────────
export const RECENT_SESSIONS = [
  { title: "Frontend Architecture", time: "2 hours ago", duration: "45m" },
  { title: "Behavioral Prep", time: "Yesterday", duration: "30m" },
  { title: "System Design Mock", time: "Oct 24", duration: "60m" },
] as const;
