// ── Page meta ────────────────────────────────────────────────────────────────
export const PAGE_META = {
  title: "Mock Interviews",
  subtitle: "Prepare for your dream job with AI-powered simulations.",
} as const;

// ── Skills available for selection ───────────────────────────────────────────
// Replace with data fetched from the user's profile once the backend is ready.
export const MOCK_SKILLS = [
  { name: "React", elo: 1250 },
  { name: "NodeJS", elo: 1100 },
  { name: "SQL", elo: 980 },
  { name: "MongoDB", elo: 1015 },
  { name: "Data Structures", elo: 850 },
  { name: "System Design", elo: 750 },
  { name: "TypeScript", elo: 1080 },
  { name: "Python", elo: 920 },
  { name: "CSS", elo: 1060 },
  { name: "JavaScript", elo: 1140 },
] as const;

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
