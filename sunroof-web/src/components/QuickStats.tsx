import cn from "classnames";
import { User, FileText, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuickStatsProps {
  totalUsers?: number;
  totalTimecards?: number;
  totalHoursThisWeek?: number;
}
interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}

const StatCard = ({ value, label, icon: Icon, className }: StatCardProps) => (
  <div className={cn("stat-card paper", className)}>
    <div className="icon">
      <Icon size={48} />
    </div>
    <div className="stat-card-right">
      <p className="stat-card-value">{value}</p>
      <p className='stat-card-label'>{label}</p>
    </div>
  </div>
);

export const QuickStats = ({
  totalUsers,
  totalTimecards,
  totalHoursThisWeek,
}: QuickStatsProps) => {
  return (
    <div className="quick-stats">
      <StatCard
        value={totalUsers?.toString() ?? '--'}
        label="Total Users"
        icon={User}
        className="blue"
      />
      <StatCard
        value={totalTimecards?.toString() ?? '--'}
        label="Total Timecards"
        icon={FileText}
        className="blue"
      />
      <StatCard
        value={totalHoursThisWeek?.toString() ?? '--'}
        label="Hours This Week"
        icon={Clock}
        className="green"
      />
    </div>
  );
};
