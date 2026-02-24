const features = [
  {
    icon: "upload_file",
    iconBg: "bg-mint-soft",
    iconColor: "text-teal-600",
    label: "PDF Context Extraction",
  },
  {
    icon: "layers",
    iconBg: "bg-indigo-soft",
    iconColor: "text-indigo-600",
    label: "Adaptive Tech Stack Focus",
  },
  {
    icon: "psychology",
    iconBg: "bg-accent-yellow/30",
    iconColor: "text-yellow-700",
    label: "Dynamic Follow-ups",
  },
];

export default function ContextParsingSection() {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Animated mock PDF scanner visual */}
          <div className="relative order-2 md:order-1 h-[400px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-soft rounded-full blur-3xl opacity-50 transform scale-90"></div>

            <div className="relative z-10 w-full max-w-sm aspect-[3/4] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-700 rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden flex flex-col">
              {/* Browser-like top bar */}
              <div className="h-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex items-center px-6 gap-2">
                <div className="size-3 rounded-full bg-slate-300"></div>
                <div className="size-3 rounded-full bg-slate-300"></div>
                <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full ml-2"></div>
              </div>

              {/* Content skeleton */}
              <div className="p-8 flex-1 flex flex-col gap-6 relative overflow-hidden">
                <div className="flex gap-4 items-center">
                  <div className="size-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-slate-800 dark:bg-slate-200 rounded-md"></div>
                    <div className="h-3 w-24 bg-slate-300 dark:bg-slate-600 rounded-md"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-4/6 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="mt-2 space-y-4">
                  {[{ w: "w-full" }, { w: "w-1/2" }].map((row, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        <div
                          className={`h-2 ${row.w} bg-slate-200 dark:bg-slate-600 rounded-full`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Scan gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-[40%] w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none top-0"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -bottom-4 size-24 bg-primary rounded-2xl -rotate-12 z-0 opacity-20"></div>
            <div className="absolute -left-8 top-10 size-16 bg-accent-yellow rounded-full z-20 opacity-40 blur-md"></div>
            <div className="absolute -right-6 top-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 z-20 flex items-center gap-3 animate-[bounce_4s_infinite]">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-sm font-bold">PDF Parsed</span>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="order-1 md:order-2">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Technical Deep Dive
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Deep Context Parsing <br />
              <span className="text-indigo-500">(Automated)</span>
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              The system ingests raw PDF resumes and extracts project
              details—like "Busbee" or "SmartPrep"—to generate highly specific
              technical questions rather than generic DSA problems.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-4">
                  <div
                    className={`size-8 rounded-full ${f.iconBg} flex items-center justify-center ${f.iconColor}`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      {f.icon}
                    </span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              See sample JSON output
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
