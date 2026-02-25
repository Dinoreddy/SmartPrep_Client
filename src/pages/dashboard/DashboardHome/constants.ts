// ── Today's Focus ────────────────────────────────────────────────────────────
export const TODAY_FOCUS = {
  badge: "Today's Focus",
  badgeIcon: "calendar_today",
  title: "NodeJS & Express",
  description:
    "Your backend orchestration Elo rating dropped to 980 after your last mock interview. Let's rebuild it with a quick 5-minute drill.",
  ctaLabel: "Start Quick Practice",
  ctaIcon: "bolt",
};

// ── Stat Cards ────────────────────────────────────────────────────────────────
export const STAT_CARDS = [
  {
    icon: "trending_up",
    iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    label: "Average Skill Elo",
    value: "1142",
    badge: "+15 pts",
  },
  {
    icon: "target",
    iconBg: "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    label: "Practice Accuracy",
    value: "82%",
    badge: "From 128 questions",
  },
  {
    icon: "mic",
    iconBg: "bg-violet-50 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    label: "Voice Mocks Completed",
    value: "12",
    badge: "Avg Score: 85/100",
  },
] as const;

// ── Recent Sessions ───────────────────────────────────────────────────────────
export const RECENT_SESSIONS = [
  {
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: "record_voice_over",
    title: "Busbee SaaS Architecture",
    subtitle: "Voice Session • 24 mins ago",
    score: "88/100",
    scoreLabel: "Score",
  },
  {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: "record_voice_over",
    title: "React Native Deep Dive",
    subtitle: "Voice Session • Yesterday",
    score: "72/100",
    scoreLabel: "Score",
  },
  {
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    icon: "bolt",
    title: "SkinBB State Management",
    subtitle: "MCQ Practice • 2 days ago",
    score: "80/100",
    scoreLabel: "Score",
  },
] as const;

// ── Resume Context ─────────────────────────────────────────────────────────────
export const RESUME_CONTEXT = {
  projects: ["Busbee (SaaS)", "SkinBB (E-commerce)"],
  techStack: ["React", "Node.js", "Sequelize", "WebSockets"],
} as const;
