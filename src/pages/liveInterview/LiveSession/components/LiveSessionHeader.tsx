import React from "react";

interface LiveSessionHeaderProps {
  onClose: () => void;
  statusText?: string;
  isPulsing?: boolean;
}

export const LiveSessionHeader: React.FC<LiveSessionHeaderProps> = ({
  onClose,
  statusText = "Live Session",
  isPulsing = true,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 w-full z-10 shrink-0">
      <div className="flex items-center gap-3 text-slate-900">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined text-[32px]">
            smart_toy
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">SmartPrep AI</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full border border-slate-200">
          <div
            className={`w-2 h-2 rounded-full bg-green-500 ${isPulsing ? "animate-pulse" : ""}`}
          ></div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {statusText}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center size-10 rounded-full bg-white hover:bg-slate-100 text-slate-600 transition-colors shadow-sm ring-1 ring-slate-900/5"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </header>
  );
};
