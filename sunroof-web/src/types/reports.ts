import type { User } from "./user";

export interface DashboardStatsResponse {
  totalUsers: number;
  totalTimeCards: number;
  totalHoursThisWeek: number;
}

type UserWithLaborAgg = User & {
  hours: number;
  laborCost: number;
  customerValue: number;
};

export interface LaborReport {
  totalHours: number;
  totalLaborCost: number;
  totalCustomerValue: number;
  grossMargin: number;
  users: UserWithLaborAgg[];
}
