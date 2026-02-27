import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 text-center">
      {/* Glowing number */}
      <div className="relative select-none mb-6">
        <span className="text-[10rem] font-extrabold leading-none text-slate-100 dark:text-slate-800">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-extrabold leading-none bg-linear-to-br from-primary via-violet-500 to-indigo-500 bg-clip-text text-transparent">
          404
        </span>
      </div>

      {/* Copy */}
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
        Page not found
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate(routes.dashboard)}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-md shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
