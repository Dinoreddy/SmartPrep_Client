export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-accent-yellow/30 blur-3xl"></div>

      <div className="px-6 md:px-12 lg:px-20 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-indigo-soft px-3 py-1 text-xs font-bold text-primary">
              <span className="material-symbols-outlined text-sm">
                terminal
              </span>
              Open Source Project
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl">
              Stop Typing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Start Speaking.
              </span>
            </h1>

            <p className="text-lg font-medium text-slate-600 dark:text-slate-400 lg:text-xl max-w-xl mx-auto lg:mx-0">
              An intelligent interview simulator featuring low-latency WebSocket
              voice streaming, deep resume context extraction, and an Elo-based
              learning system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="h-14 px-8 rounded-xl bg-primary text-white text-lg font-bold shadow-bouncy hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                Try the Live Demo
              </button>
              <button className="h-14 px-8 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                View Source Code
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500 mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">code</span>
              </div>
              <span>Built entirely with React, Node.js, and WebSockets.</span>
            </div>
          </div>

          {/* Right: Floating mockup visual */}
          <div className="flex-1 w-full max-w-[600px] h-[400px] lg:h-[500px] relative flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-soft to-white rounded-full opacity-50 blur-3xl transform scale-75"></div>

              {/* Mock resume card */}
              <div className="relative z-10 w-80 h-auto aspect-[3/4] bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-slate-100 dark:border-slate-700 p-8 flex flex-col gap-6 transform -rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">
                      person
                    </span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-4/6 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-16 w-1/3 bg-indigo-50 dark:bg-slate-700 rounded-xl"></div>
                    <div className="h-16 w-2/3 bg-slate-50 dark:bg-slate-700 rounded-xl"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                </div>
                {/* Scan line animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(37,106,244,0.6)] animate-[scan_2.5s_ease-in-out_infinite] rounded-full z-20"></div>
              </div>

              {/* Floating badge: mic */}
              <div className="absolute -right-4 top-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-[bounce_3s_infinite] z-20">
                <span className="material-symbols-outlined text-3xl text-primary">
                  mic
                </span>
              </div>

              {/* Floating badge: code */}
              <div className="absolute -left-8 bottom-32 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-[bounce_4s_infinite] delay-700 z-20">
                <span className="material-symbols-outlined text-3xl text-accent-yellow/90">
                  code
                </span>
              </div>

              {/* Decorative dashed ring */}
              <div className="absolute top-10 right-10 size-20 rounded-full border-4 border-dashed border-indigo-200 animate-[spin_10s_linear_infinite] opacity-50 pointer-events-none"></div>

              {/* Decorative mint square */}
              <div className="absolute bottom-10 left-10 size-12 bg-mint-soft rounded-lg transform rotate-12 opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
