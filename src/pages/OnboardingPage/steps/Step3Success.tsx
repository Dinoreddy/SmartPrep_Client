import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";
import SkillBadge from "../components/SkillBadge";
import ProjectCard from "../components/ProjectCard";

interface Step3SuccessProps {
  onNext: () => void; // kept for interface compatibility but unused — we navigate instead
}

export default function Step3Success(_: Step3SuccessProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const skills = user?.resumeProfile?.skills ?? [];
  const projects = user?.resumeProfile?.projects ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      {/* Green success banner */}
      <div className="bg-emerald-500 py-3 px-6 flex items-center justify-center gap-2 text-white font-bold text-sm">
        <span className="material-symbols-outlined text-lg">check_circle</span>
        <span>Resume parsed successfully!</span>
      </div>

      <div className="p-8 md:p-10 flex flex-col items-center text-center">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Ready for Lift Off! 🚀
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            We've successfully extracted your profile details. Here's a quick
            look at what we found.
          </p>
        </div>

        <div className="w-full space-y-8 text-left">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Top Skills Found
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Core Projects Identified
              </h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.name}
                    icon="deployed_code"
                    title={project.name}
                    subtitle={project.techStack.join(", ")}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-indigo-600 mt-0.5">
              lightbulb
            </span>
            <p className="text-slate-600 text-sm leading-relaxed">
              <span className="font-bold text-slate-900">Quick Tip:</span> Don't
              worry, you can refine all these details later in your dashboard
              settings!
            </p>
          </div>
        </div>

        {/* CTA — user is authenticated after registration, go straight to dashboard */}
        <div className="mt-10 w-full">
          <button
            type="button"
            onClick={() => navigate(routes.dashboard)}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Go to Dashboard</span>
            <span className="text-xl">🚀</span>
          </button>
          <p className="mt-4 text-xs text-slate-400 font-medium text-center">
            Your personalized preparation area awaits…
          </p>
        </div>
      </div>
    </div>
  );
}
