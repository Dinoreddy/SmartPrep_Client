import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  /** Override the default browser-back with a specific route */
  to?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

/**
 * Global back-navigation button.
 * - If `onClick` is provided, calls it.
 * - Else if `to` is provided, navigates there.
 * - Otherwise calls navigate(-1) (browser back).
 */
export default function BackButton({
  to,
  onClick,
  label,
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    navigate(-1);
  }

  return (
    <button
      onClick={handleClick}
      title={label ?? "Go back"}
      className={`inline-flex items-center justify-center p-2 rounded-xl
        text-slate-500 dark:text-slate-400
        hover:bg-slate-100 dark:hover:bg-slate-800
        hover:text-slate-700 dark:hover:text-slate-200
        transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      {label && <span className="ml-1.5 text-sm font-semibold">{label}</span>}
    </button>
  );
}
