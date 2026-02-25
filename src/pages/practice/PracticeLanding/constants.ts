// ── Page meta ────────────────────────────────────────────────────────────────
export const PAGE_META = {
  title: "Practice Room",
  subtitle: "Sharpen your skills and boost your Elo rating.",
  globalRank: 420,
} as const;

// ── Priority weak-skill banner ────────────────────────────────────────────────
export const WEAK_SKILL = {
  label: "Priority Focus",
  labelIcon: "warning",
  title: "Web Security",
  elo: 1000,
  eloStatus: "Needs Improvement",
  description:
    "Focusing on your weakest areas yields the highest return on investment for your interview prep.",
  ctaLabel: "Start Practice: Web Security",
} as const;

// ── Skill cards ───────────────────────────────────────────────────────────────
// Icon + colour config is auto-resolved from skillIconRegistry by SkillCard.
// Only data the API would return is needed here.
export const SKILLS = [
  { title: "React", elo: 1200, solved: 10, total: 50 },
  { title: "NodeJS", elo: 1150, solved: 25, total: 50 },
  { title: "SQL", elo: 1400, solved: 45, total: 50 },
  { title: "MongoDB", elo: 980, solved: 5, total: 50 },
] as const;
