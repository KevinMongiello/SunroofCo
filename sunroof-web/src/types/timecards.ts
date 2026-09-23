import type { User } from "./user";

export interface TimeCard {
  id: string;
  date: string;
  hoursWorked: number;
  userId: string;
}

export type TimeCardWithUser = TimeCard & { user: User}

