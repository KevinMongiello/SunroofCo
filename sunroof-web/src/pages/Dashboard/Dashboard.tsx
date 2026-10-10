import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { QuickActions } from "../../components/Dashboard/QuickActions";
import { DashboardStats } from "../../components/Dashboard/DashboardStats";
import { RecentTimecards } from "../../components/Dashboard/RecentTimecards";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { fetchAllTimeCards } from "../../api/timecards";
import type { TimeCardWithUser } from "../../types/timecards";
import { fetchDashboardStats } from "../../api/reports";
import type { DashboardStatsResponse } from "../../types/reports";


export const Dashboard = () => {
  const [timecards, setTimecards] = useState<TimeCardWithUser[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsResponse>();
  const navigate = useNavigate();
  const onViewAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/timecards");
  };

  useEffect(() => {
    fetchAllTimeCards({
      includeUser: true,
      limit: 5,
      order: { by: "date", dir: "desc" },
    }).then(setTimecards);
    fetchDashboardStats().then(setDashboardStats);
  }, []);

  const onAddUser = () => navigate("/users/new?returnTo=/");
  const onAddTimecard = () => navigate("/timecards/new?returnTo=/");
  return (
    <main>
      <AppHeader
        h1Text="Dashboard"
        h2Text="Here's what's happening with your team."
      />
      <DashboardStats
        totalUsers={dashboardStats?.totalUsers}
        totalTimecards={dashboardStats?.totalTimeCards}
        totalHoursThisWeek={dashboardStats?.totalHoursThisWeek}
      />
      <div className="dashboard-bottom">
        <RecentTimecards timecards={timecards} onViewAll={onViewAll} />
        <QuickActions onAddUser={onAddUser} onAddTimecard={onAddTimecard} />
      </div>
    </main>
  );
};
