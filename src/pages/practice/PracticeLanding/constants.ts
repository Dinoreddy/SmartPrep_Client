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
// Rendered dynamically from user.skillElo inside PracticeLanding/index.tsx
