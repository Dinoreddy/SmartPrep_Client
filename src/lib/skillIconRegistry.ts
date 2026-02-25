/**
 * Skill Icon Registry
 *
 * Maps lowercase skill names to their visual config (Material Symbol icon + Tailwind colours).
 * SkillCard resolves icons by calling `getSkillIcon(skillTitle)`.
 *
 * To add a new skill: add an entry below keyed by the skill's lowercase name.
 * - Aliases (e.g. "node.js" / "nodejs") can share the same config object.
 * - Unknown skills automatically get DEFAULT_SKILL_ICON.
 */

export interface SkillIconConfig {
  /** Material Symbols Outlined icon name */
  icon: string;
  /** Tailwind class for the small icon box background */
  iconBg: string;
  /** Tailwind class for the icon colour */
  iconColor: string;
  /** Tailwind class for the decorative corner blob */
  cornerBg: string;
}

const DEFAULT_SKILL_ICON: SkillIconConfig = {
  icon: "psychology",
  iconBg: "bg-slate-100 dark:bg-slate-800",
  iconColor: "text-slate-500 dark:text-slate-400",
  cornerBg: "bg-slate-50 dark:bg-slate-800",
};

// Shared palette helpers to keep entries DRY
const palette = {
  blue: {
    iconBg: "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-blue-500 dark:text-blue-300",
    cornerBg: "bg-blue-50 dark:bg-blue-900/10",
  },
  green: {
    iconBg: "bg-green-50 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    cornerBg: "bg-green-50 dark:bg-green-900/10",
  },
  purple: {
    iconBg: "bg-purple-50 dark:bg-purple-900/30",
    iconColor: "text-purple-500 dark:text-purple-300",
    cornerBg: "bg-purple-50 dark:bg-purple-900/10",
  },
  violet: {
    iconBg: "bg-violet-50 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    cornerBg: "bg-violet-50 dark:bg-violet-900/10",
  },
  emerald: {
    iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    cornerBg: "bg-emerald-50 dark:bg-emerald-900/10",
  },
  orange: {
    iconBg: "bg-orange-50 dark:bg-orange-900/30",
    iconColor: "text-orange-500 dark:text-orange-300",
    cornerBg: "bg-orange-50 dark:bg-orange-900/10",
  },
  red: {
    iconBg: "bg-red-50 dark:bg-red-900/30",
    iconColor: "text-red-500 dark:text-red-300",
    cornerBg: "bg-red-50 dark:bg-red-900/10",
  },
  yellow: {
    iconBg: "bg-yellow-50 dark:bg-yellow-900/30",
    iconColor: "text-yellow-500 dark:text-yellow-300",
    cornerBg: "bg-yellow-50 dark:bg-yellow-900/10",
  },
  indigo: {
    iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    cornerBg: "bg-indigo-50 dark:bg-indigo-900/10",
  },
  slate: {
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-300",
    cornerBg: "bg-slate-50 dark:bg-slate-700/20",
  },
  teal: {
    iconBg: "bg-teal-50 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    cornerBg: "bg-teal-50 dark:bg-teal-900/10",
  },
};

const SKILL_ICON_REGISTRY: Record<string, SkillIconConfig> = {
  // ── Frontend ───────────────────────────────────────────────────────────────
  react: { icon: "code", ...palette.blue },
  "react native": { icon: "smartphone", ...palette.blue },
  vue: { icon: "code", ...palette.green },
  angular: { icon: "change_history", ...palette.red },
  svelte: { icon: "bolt", ...palette.orange },
  typescript: { icon: "code", ...palette.blue },
  javascript: { icon: "javascript", ...palette.yellow },
  html: { icon: "html", ...palette.orange },
  css: { icon: "css", ...palette.blue },
  tailwind: { icon: "style", ...palette.teal },
  tailwindcss: { icon: "style", ...palette.teal },
  "next.js": { icon: "dark_mode", ...palette.slate },
  nextjs: { icon: "dark_mode", ...palette.slate },

  // ── Backend ────────────────────────────────────────────────────────────────
  nodejs: { icon: "dns", ...palette.green },
  "node.js": { icon: "dns", ...palette.green },
  express: { icon: "route", ...palette.slate },
  "express.js": { icon: "route", ...palette.slate },
  django: { icon: "hub", ...palette.green },
  flask: { icon: "science", ...palette.slate },
  fastapi: { icon: "bolt", ...palette.teal },
  "spring boot": { icon: "eco", ...palette.green },
  graphql: { icon: "share", ...palette.violet },
  "rest api": { icon: "api", ...palette.indigo },
  websockets: { icon: "sensors", ...palette.blue },

  // ── Languages ──────────────────────────────────────────────────────────────
  python: { icon: "code", ...palette.blue },
  java: { icon: "code", ...palette.orange },
  go: { icon: "code", ...palette.teal },
  rust: { icon: "hardware", ...palette.orange },
  "c++": { icon: "memory", ...palette.blue },
  "c#": { icon: "code", ...palette.purple },
  ruby: { icon: "diamond", ...palette.red },
  php: { icon: "code", ...palette.purple },

  // ── Databases ──────────────────────────────────────────────────────────────
  sql: { icon: "database", ...palette.purple },
  mysql: { icon: "database", ...palette.orange },
  postgresql: { icon: "database", ...palette.blue },
  mongodb: { icon: "eco", ...palette.emerald },
  redis: { icon: "memory", ...palette.red },
  firebase: { icon: "local_fire_department", ...palette.orange },
  dynamodb: { icon: "database", ...palette.orange },
  cassandra: { icon: "storage", ...palette.blue },
  sequelize: { icon: "table_rows", ...palette.blue },

  // ── Cloud & DevOps ─────────────────────────────────────────────────────────
  aws: { icon: "cloud", ...palette.orange },
  gcp: { icon: "cloud", ...palette.blue },
  azure: { icon: "cloud", ...palette.blue },
  docker: { icon: "deployed_code", ...palette.blue },
  kubernetes: { icon: "settings_applications", ...palette.blue },
  "ci/cd": { icon: "loop", ...palette.violet },
  terraform: { icon: "construction", ...palette.violet },

  // ── CS Concepts ────────────────────────────────────────────────────────────
  "system design": { icon: "architecture", ...palette.indigo },
  "web security": { icon: "security", ...palette.red },
  algorithms: { icon: "functions", ...palette.violet },
  "data structures": { icon: "account_tree", ...palette.violet },
  "operating systems": { icon: "computer", ...palette.slate },
  networking: { icon: "network_node", ...palette.teal },
  "machine learning": { icon: "model_training", ...palette.indigo },
};

/**
 * Look up icon config for a given skill name.
 * Comparison is case-insensitive. Falls back to a neutral default for unknown skills.
 */
export function getSkillIcon(skillName: string): SkillIconConfig {
  return (
    SKILL_ICON_REGISTRY[skillName.toLowerCase().trim()] ?? DEFAULT_SKILL_ICON
  );
}
