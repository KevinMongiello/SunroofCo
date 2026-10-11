import { useApiQuery } from "../../hooks/useApiQuery";
import { RequestStatus } from "../../components/RequestStatus/RequestStatus";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { QuickActions } from "../../components/Dashboard/QuickActions";
import { DashboardStats } from "../../components/Dashboard/DashboardStats";
import { RecentTimecards } from "../../components/Dashboard/RecentTimecards";
import "./Dashboard.css";
import { fetchAllTimeCards } from "../../api/timecards";
import { fetchDashboardStats } from "../../api/reports";

const loadRecentTimecards = () =>
  fetchAllTimeCards({
    includeUser: true,
    limit: 5,
    order: { by: "date", dir: "desc" },
  });

export const Dashboard = () => {
  const timecardsQuery = useApiQuery(
    loadRecentTimecards,
    "Unable to load recent timecards.",
  );
  const statsQuery = useApiQuery(
    fetchDashboardStats,
    "Unable to load dashboard statistics.",
  );
  const dashboardStats = statsQuery.data;
  const navigate = useNavigate();
  const onViewAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/timecards");
  };

  const onAddUser = () => navigate("/users/new?returnTo=/");
  const onAddTimecard = () => navigate("/timecards/new?returnTo=/");
  return (
    <main>
      <AppHeader
        h1Text="Dashboard"
        h2Text="Here's what's happening with your team."
      />
      <RequestStatus {...statsQuery} />
      {!statsQuery.isLoading && !statsQuery.error && (
        <DashboardStats
          totalUsers={dashboardStats?.totalUsers}
          totalTimecards={dashboardStats?.totalTimeCards}
          totalHoursThisWeek={dashboardStats?.totalHoursThisWeek}
        />
      )}
      <div className="dashboard-bottom">
        <RequestStatus {...timecardsQuery} />
        {!timecardsQuery.isLoading && !timecardsQuery.error && (
          <RecentTimecards
            timecards={timecardsQuery.data ?? []}
            onViewAll={onViewAll}
          />
        )}
        <QuickActions onAddUser={onAddUser} onAddTimecard={onAddTimecard} />
      </div>
    </main>
  );
};
