interface ProjectCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

export default function ProjectCard({
  icon,
  title,
  subtitle,
}: ProjectCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 group">
      <div className="bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm text-indigo-600">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
          {title}
        </h4>
        <p className="text-xs text-slate-500 truncate max-w-[240px]">
          {subtitle}
        </p>
      </div>
      <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-600 transition-colors cursor-pointer text-xl">
        edit
      </span>
    </div>
  );
}
