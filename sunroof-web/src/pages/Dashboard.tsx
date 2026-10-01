import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { QuickActions } from "../components/QuickActions";
import { QuickStats } from "../components/QuickStats";
import { RecentTimecards } from "../components/RecentTimecards";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { fetchAllTimeCards } from "../api/timecards";
import type { TimeCardWithUser } from "../types/timecards";
import { fetchDashboardStats } from "../api/reports";

interface DashboardStats {
  totalUsers: number;
  totalTimeCards: number;
  totalHoursThisWeek: number;
}

export const Dashboard = () => {
  const [timecards, setTimecards] = useState<TimeCardWithUser[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>();
  const navigate = useNavigate();
  const onViewAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/timecards");
  };

  useEffect(() => {
    fetchAllTimeCards({ includeUser: true, limit: 5, order: { by: 'date', dir: 'desc'} }).then(setTimecards);
    fetchDashboardStats().then(setDashboardStats)
  }, []);

  const onAddUser = () => navigate("/users/new?returnTo=/");
  const onAddTimecard = () => navigate("/timecards/new?returnTo=/");
  console.log({dashboardStats})
  return (
    <>
      <AppHeader h1Text="Dashboard" h2Text="Here's what's happening with your team." />
      <QuickStats totalUsers={dashboardStats?.totalUsers} totalTimecards={dashboardStats?.totalTimeCards} totalHoursThisWeek={dashboardStats?.totalHoursThisWeek} />
      <div className="dashboard-bottom">
        <RecentTimecards timecards={timecards} onViewAll={onViewAll} />
        <QuickActions onAddUser={onAddUser} onAddTimecard={onAddTimecard} />
      </div>
    </>
  );
};
