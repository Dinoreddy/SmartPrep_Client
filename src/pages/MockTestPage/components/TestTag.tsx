interface TestTagProps {
  label: string;
}

export default function TestTag({ label }: TestTagProps) {
  return (
    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      {label}
    </span>
  );
}
