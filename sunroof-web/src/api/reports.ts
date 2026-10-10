import type { DateRange } from "../types/date";
import type { DashboardStatsResponse, LaborReport } from "../types/reports";
import { requestJson } from "./requests";

const REPORTS_PATH = "/reports";

export const fetchDashboardStats = () => {
  return requestJson<DashboardStatsResponse>(`${REPORTS_PATH}/dashboard`)
};

export const fetchLaborReport = ({ startDate, endDate }: DateRange) => {
  return requestJson<LaborReport>(`${REPORTS_PATH}/labor?startDate=${startDate}&endDate=${endDate}`);
};
