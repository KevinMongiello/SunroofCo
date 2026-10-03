import type { User } from "../../types/user.ts";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader/AppHeader.tsx";
import { fetchLaborReport } from "../../api/reports.ts";
import { ReportCards } from "../../components/Reports/ReportCards.tsx";
import { useEffect, useState } from "react";
import { getDateRange } from "../../util/date.ts";
import type { DateRange } from "../../types/date.ts";
import { DateRangePicker } from "../../components/DateRangePicker/DateRangePicker.tsx";
import { HoursByUserChart } from "../../components/Reports/HoursByUserChart.tsx";
import { ValueVsLabor } from "../../components/Reports/ValueVsLabor.tsx";
import "./ReportsPage.scss";
type UserWithLaborAgg = User & {
  hours: number;
  laborCost: number;
  customerValue: number;
};

interface LaborReport {
  totalHours: number;
  totalLaborCost: number;
  totalCustomerValue: number;
  grossMargin: number;
  users: UserWithLaborAgg[];
}

export const ReportsPage = () => {
  const navigate = useNavigate();
  const [laborReport, setLaborReport] = useState<LaborReport | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(getDateRange(7)); // default to 1 week

  useEffect(() => {
    fetchLaborReport(dateRange).then(setLaborReport);
  }, [dateRange]);

  const buttonConfigs = [{ onClick: () => {}, label: "Export CSV" }];
  console.log("laborReport ", laborReport);
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
            scale='md'
            />
          <HoursByUserChart users={laborReport?.users || []} />
        </div>
        <div className="paper pd-16">
          <AppHeader
            h1Text="Customer Value vs Labor Cost"
            h2Text="Total comparison for this period."
            scale='md'
          />
          <ValueVsLabor data={valuelVsLabor} />
        </div>
      </section>
    </main>
  );
};
