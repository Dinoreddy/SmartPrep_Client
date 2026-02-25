import SessionRow from "./SessionRow";

interface Session {
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  subtitle: string;
  score: string;
  scoreLabel: string;
}

interface RecentSessionsCardProps {
  sessions: readonly Session[];
}

export default function RecentSessionsCard({
  sessions,
}: RecentSessionsCardProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Recent Sessions
        </h3>
        <a
          className="text-primary text-sm font-medium hover:underline"
          href="#"
        >
          View All
        </a>
      </div>
      <div className="p-2">
        {sessions.map((session) => (
          <SessionRow key={session.title} {...session} />
        ))}
      </div>
    </div>
  );
}
