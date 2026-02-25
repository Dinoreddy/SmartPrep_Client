// ── Page meta ────────────────────────────────────────────────────────────────
export const PAGE_META = {
  title: "Mock Interviews",
  subtitle: "Prepare for your dream job with AI-powered simulations.",
} as const;

// ── Hero banner ───────────────────────────────────────────────────────────────
export const HERO = {
  titleLine1: "Challenge Yourself with a",
  titleHighlight: "Mock Test",
  description:
    "Test your knowledge across your skill set with timed MCQ rounds. Spot your weak areas, track your Elo, and sharpen your edge before the real interview.",
  ctaLabel: "Start Mock Test",
  ctaIcon: "play_circle",
  durationLabel: "Takes ~20 mins",
  durationIcon: "timer",
} as const;

// ── Summary stat cards ────────────────────────────────────────────────────────
export const MOCK_STAT_CARDS = [
  {
    icon: "assignment",
    label: "Total Tests",
    value: "12",
    badge: "Last 30 days",
    palette: {
      bg: "bg-white dark:bg-slate-900",
      border: "border-blue-100 dark:border-blue-800/30",
      iconColor: "text-blue-500",
      labelColor: "text-blue-900 dark:text-blue-200",
      badgeColor: "text-blue-600/80 dark:text-blue-400",
    },
  },
  {
    icon: "analytics",
    label: "Avg Score",
    value: "78",
    valueSuffix: "/100",
    badge: "+4% from last week",
    palette: {
      bg: "bg-white dark:bg-slate-900",
      border: "border-purple-100 dark:border-purple-800/30",
      iconColor: "text-purple-500",
      labelColor: "text-purple-900 dark:text-purple-200",
      badgeColor: "text-purple-600/80 dark:text-purple-400",
    },
  },
  {
    icon: "verified",
    label: "Strongest Skill",
    value: "React",
    badge: "Top 5% of students",
    palette: {
      bg: "bg-white dark:bg-slate-900",
      border: "border-emerald-100 dark:border-emerald-800/30",
      iconColor: "text-emerald-500",
      labelColor: "text-emerald-900 dark:text-emerald-200",
      badgeColor: "text-emerald-600/80 dark:text-emerald-400",
    },
  },
] as const;

// ── Recent mock test history ───────────────────────────────────────────────────
export const RECENT_MOCK_TESTS = [
  {
    title: "Full-Stack Developer Mock",
    time: "2 hours ago",
    tags: ["React", "NodeJS", "System Design"],
    score: 85,
  },
  {
    title: "Frontend Intern Mock",
    time: "Yesterday",
    tags: ["CSS", "JavaScript", "Accessibility"],
    score: 62,
  },
  {
    title: "Data Analyst Mock",
    time: "Oct 24",
    tags: ["Python", "SQL", "Tableau"],
    score: 92,
  },
] as const;
