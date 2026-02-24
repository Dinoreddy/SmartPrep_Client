import type { ReactNode } from "react";

interface FeatureCardProps {
  bgColor: string;
  iconBg: string;
  icon: string;
  iconColor: string;
  title: string;
  titleSize?: string;
  titleDark?: string;
  description: string;
  descSize?: string;
  descDark?: string;
  colSpan?: string;
  decoration?: ReactNode;
}

export default function FeatureCard({
  bgColor,
  iconBg,
  icon,
  iconColor,
  title,
  titleSize = "text-xl",
  titleDark = "",
  description,
  descSize = "",
  descDark = "",
  colSpan = "",
  decoration,
}: FeatureCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl ${bgColor} p-8 transition-all hover:-translate-y-2 hover:shadow-xl ${colSpan}`}
    >
      {decoration}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div
          className={`size-14 rounded-xl ${iconBg} shadow-sm flex items-center justify-center ${iconColor} mb-4 group-hover:scale-110 transition-transform`}
        >
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div>
          <h3
            className={`${titleSize} font-black text-slate-900 ${titleDark} mb-2`}
          >
            {title}
          </h3>
          <p className={`font-medium text-slate-600 ${descDark} ${descSize}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
