import type { DateRange } from "../types/date";

const REPORTS_PATH = "http://localhost:3000/reports/";

export const fetchDashboardStats = async () => {
  const resp = await fetch(REPORTS_PATH + "dashboard");
  return await resp.json();
};

export const fetchLaborReport = async ({ startDate, endDate }: DateRange) => {
  const resp = await fetch(
    REPORTS_PATH + `labor?startDate=${startDate}&endDate=${endDate}`,
  );
  return await resp.json();
};
