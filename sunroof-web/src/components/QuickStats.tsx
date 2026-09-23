import cn from "classnames";
import { User, FileText, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuickStatsProps {
  totalUsers?: number;
  totalTimecards?: number;
  totalHoursThisWeek?: number;
}
interface CardProps {
  h1: string;
  h2: string;
  icon: LucideIcon;
  className?: string;
}

const Card = ({ h1, h2, icon: Icon, className }: CardProps) => (
  <div className={cn("card paper", className)}>
    <div className="icon">
      <Icon size={48} />
    </div>
    <div className="card-right">
      <h1>{h1}</h1>
      <h2>{h2}</h2>
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
      <Card
        h1={totalUsers?.toString() ?? '--'}
        h2="Total Users"
        icon={User}
        className="blue"
      />
      <Card
        h1={totalTimecards?.toString() ?? '--'}
        h2="Total Timecards"
        icon={FileText}
        className="blue"
      />
      <Card
        h1={totalHoursThisWeek?.toString() ?? '--'}
        h2="Hours This Week"
        icon={Clock}
        className="green"
      />
    </div>
  );
};
