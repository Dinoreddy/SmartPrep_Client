interface SkillBadgeProps {
  label: string;
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-600/10 text-indigo-600 text-sm font-semibold">
      {label}
    </span>
  );
}
