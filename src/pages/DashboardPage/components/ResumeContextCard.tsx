import TechTag from "./TechTag";

interface ResumeContextCardProps {
  projects: readonly string[];
  techStack: readonly string[];
}

export default function ResumeContextCard({
  projects,
  techStack,
}: ResumeContextCardProps) {
  return (
    <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <span className="material-symbols-outlined">badge</span>
        </div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Resume Context
        </h3>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {/* Projects */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2">
            Active Projects (Parsed)
          </p>
          <div className="space-y-1">
            {projects.map((project) => (
              <p
                key={project}
                className="text-slate-900 dark:text-white font-semibold"
              >
                {project}
              </p>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2">
            Extracted Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        </div>

        {/* Update button */}
        <div className="mt-auto pt-4">
          <button className="w-full py-2 px-4 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Update Resume
          </button>
        </div>
      </div>
    </div>
  );
}
