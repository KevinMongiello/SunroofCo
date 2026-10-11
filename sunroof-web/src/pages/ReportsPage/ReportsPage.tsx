import { useApiQuery } from "../../hooks/useApiQuery";
import { RequestStatus } from "../../components/RequestStatus/RequestStatus";
import { AppHeader } from "../../components/AppHeader/AppHeader.tsx";
import { fetchLaborReport } from "../../api/reports.ts";
import { ReportCards } from "../../components/Reports/ReportCards.tsx";
import { useCallback, useState } from "react";
import { getDateRange } from "../../util/date.ts";
import type { DateRange } from "../../types/date.ts";
import { DateRangePicker } from "../../components/DateRangePicker/DateRangePicker.tsx";
import { HoursByUserChart } from "../../components/Reports/HoursByUserChart.tsx";
import { ValueVsLabor } from "../../components/Reports/ValueVsLabor.tsx";
import "./ReportsPage.css";
import { ChatBoxContainer } from "../../components/ChatBox/ChatBoxContainer.tsx";

export const ReportsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>(getDateRange(7)); // default to 1 week

  const load = useCallback(() => fetchLaborReport(dateRange), [dateRange]);
  const query = useApiQuery(
    load,
    "Unable to load the labor report. Please try again.",
  );
  const laborReport = query.data;

  const buttonConfigs = [{
    onClick: query.retry,
    label: query.isLoading ? "Refreshing…" : "Refresh report",
    disabled: query.isLoading,
  }];
  const valuelVsLabor = [
    {
      name: "Labor Cost",
      value: laborReport?.totalLaborCost || 0,
      color: "#3ebf6f",
    },
    {
      name: "Customer Value",
      value: laborReport?.totalCustomerValue || 0,
      color: "#3478f6",
    },
  ];

  return (
    <main className="reports-page">
      <section>
        <AppHeader
          h1Text="Reports"
          h2Text="Analyze labor, cost, and customer value in real time."
          buttonConfigs={buttonConfigs}
          classNames="reports-page-header"
        >
          <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
        </AppHeader>
      </section>
      <RequestStatus {...query} />
      {!query.isLoading && !query.error && (
        <>
          <section className="stat-cards">
            <ReportCards
              totalHours={laborReport?.totalHours}
              totalLaborCost={laborReport?.totalLaborCost}
              totalCustomerValue={laborReport?.totalCustomerValue}
              grossMargin={laborReport?.grossMargin}
            />
          </section>
          <section className="reports-charts">
            <div className="paper pd-16">
              <AppHeader
                h1Text="Hours By User"
                h2Text="Total hours logged in this period."
                scale="md"
              />
              <HoursByUserChart users={laborReport?.users || []} />
            </div>
            <div className="paper pd-16">
              <AppHeader
                h1Text="Customer Value vs Labor Cost"
                h2Text="Total comparison for this period."
                scale="md"
              />
              <ValueVsLabor data={valuelVsLabor} />
            </div>
          </section>
        </>
      )}
      <ChatBoxContainer />
    </main>
  );
};
