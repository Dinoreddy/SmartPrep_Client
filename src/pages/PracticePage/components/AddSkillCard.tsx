interface AddSkillCardProps {
  onAdd?: () => void;
}

export default function AddSkillCard({ onAdd }: AddSkillCardProps) {
  return (
    <button
      onClick={onAdd}
      className="rounded-2xl p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center group hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer min-h-[300px] w-full"
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl transition-colors">
          add
        </span>
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        Add New Skill
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
        Browse our library of 50+ technical skills
      </p>
    </button>
  );
}
