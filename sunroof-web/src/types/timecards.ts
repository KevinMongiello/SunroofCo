import type { User } from "./user";

export interface TimeCard {
  id: string;
  date: string;
  hoursWorked: number;
  userId: string;
}

export type TimeCardWithUser = TimeCard & { user: User}
export type CreateTimeCard = Omit<TimeCard, 'id'>
export type CreateTimeCardForm = Omit<TimeCard, 'id' | 'userId'>
export type UpdateTimecard = Partial<Omit<TimeCard, 'id'>>

export interface FetchTimecardsOptions {
  includeUser?: boolean;
  limit?: number;
  order?: {
    by: keyof UpdateTimecard;
    dir?: "asc" | "desc";
  };
}
