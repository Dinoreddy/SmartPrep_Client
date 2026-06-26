import { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "info";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({
  message,
  type = "success",
  isOpen,
  onClose,
  duration = 5000,
}: SnackbarProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const iconName = {
    success: "check_circle",
    error: "error",
    info: "info",
  }[type];

  const borderClass = {
    success: "border-emerald-500/30 dark:border-emerald-500/20",
    error: "border-red-500/30 dark:border-red-500/20",
    info: "border-indigo-500/30 dark:border-indigo-500/20",
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-50 animate-slide-in-right flex items-center justify-between gap-4 px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md bg-slate-900/95 dark:bg-slate-950/95 border ${borderClass} text-slate-100 min-w-[280px] max-w-sm`}>
      <div className="flex items-center gap-3">
        <span
          className={`material-symbols-outlined text-[22px] shrink-0 select-none ${
            type === "success"
              ? "text-emerald-400"
              : type === "error"
              ? "text-red-400"
              : "text-indigo-400"
          }`}
        >
          {iconName}
        </span>
        <span className="text-sm font-semibold tracking-wide leading-tight text-slate-100">
          {message}
        </span>
      </div>
      <button
        onClick={onClose}
        className="text-slate-450 hover:text-slate-200 dark:text-slate-500 dark:hover:text-slate-350 transition-colors shrink-0 ml-1"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-lg leading-none">close</span>
      </button>
    </div>
  );
}
