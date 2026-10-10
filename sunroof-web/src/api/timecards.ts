import { requestJson } from "./requests";
import type {
  CreateTimeCard,
  TimeCard,
  TimeCardWithUser,
  UpdateTimecard,
  FetchTimecardsOptions,
} from "../types/timecards";

export function fetchAllTimeCards(
  options: FetchTimecardsOptions & { includeUser: true },
): Promise<TimeCardWithUser[]>;

export function fetchAllTimeCards(
  options?: FetchTimecardsOptions & { includeUser?: false },
): Promise<TimeCard[]>;

export function fetchAllTimeCards(
  options: FetchTimecardsOptions,
): Promise<(TimeCard | TimeCardWithUser)[]>;

export function fetchAllTimeCards({
  includeUser,
  limit,
  order,
}: FetchTimecardsOptions = {}): Promise<(TimeCard | TimeCardWithUser)[]> {
  const params = new URLSearchParams();

  if (includeUser) {
    params.set("includeUser", "true");
  }

  if (limit !== undefined && Number.isInteger(limit) && limit > 0) {
    params.set("limit", String(limit));
  }

  if (order) {
    params.set("orderBy", order.by);
    params.set("orderDir", order.dir ?? "asc");
  }

  const query = params.toString();
  const path = query ? `/timecards?${query}` : "/timecards";

  return requestJson<(TimeCard | TimeCardWithUser)[]>(path);
}

export function fetchTimecard(id: string) {
  return requestJson<TimeCard | null>(`/timecards/${id}`);
}

export function createTimecard(data: CreateTimeCard) {
  return requestJson<TimeCard>("/timecards", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTimecard(id: string, data: UpdateTimecard) {
  return requestJson<unknown>(`/timecards/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteTimecard(id: string) {
  return requestJson<unknown>(`/timecards/${id}`, {
    method: "DELETE",
  });
}