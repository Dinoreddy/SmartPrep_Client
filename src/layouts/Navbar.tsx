import { Link } from "react-router-dom";
import { routes } from "@/routes/paths";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 md:px-12 lg:px-20">
      <div className="flex items-center gap-3 text-slate-900 dark:text-white group cursor-pointer">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-bouncy transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">SmartPrep AI</h2>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            Architecture
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            GitHub
          </a>
        </nav>
        <Link
          to={routes.onboarding}
          className="flex h-10 items-center justify-center rounded-full bg-slate-900 dark:bg-white px-6 text-sm font-bold text-white dark:text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        >
          Sign Up/In
        </Link>
      </div>

      <button className="md:hidden p-2 text-slate-900 dark:text-white">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
