import { User, FileText, Clock } from "lucide-react";
import { StatCard } from "../StatCard/StatCard";

interface DashboardStatsProps {
  totalUsers?: number;
  totalTimecards?: number;
  totalHoursThisWeek?: number;
}

export const DashboardStats = ({
  totalUsers,
  totalTimecards,
  totalHoursThisWeek,
}: DashboardStatsProps) => {
  return (
    <div className="stat-cards">
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
