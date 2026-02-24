export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-12 px-6 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">
            smart_toy
          </span>
          <span className="text-xl font-bold">SmartPrep AI</span>
        </div>
        <div className="text-sm text-slate-500">
          © 2023 SmartPrep AI. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a className="text-slate-400 hover:text-primary" href="#">
            <span className="material-symbols-outlined">mail</span>
          </a>
          <a className="text-slate-400 hover:text-primary" href="#">
            <span className="material-symbols-outlined">public</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
