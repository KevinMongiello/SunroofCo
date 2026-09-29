import type { CreateTimeCard, UpdateTimecard } from "../types/timecards";

const TIMECARDS_PATH = "http://localhost:3000/timecards/";

export const fetchAllTimeCards = async ({
  includeUser,
  limit,
  order,
}: {
  includeUser?: boolean;
  limit?: number;
  order?: { by: string; dir?: "asc" | "desc" };
} = {}) => {
  const params = new URLSearchParams();
  if (includeUser) params.set("includeUser", "true");
  if (limit && Number.isInteger(limit) && limit > 0)
    params.set("limit", String(limit));
  if (order?.by) {
    params.set("orderBy", order.by);
    params.set("orderDir", order.dir || "asc");
  }
  const resp = await fetch(`${TIMECARDS_PATH}?${params.toString()}`);
  return await resp.json();
};

export const deleteTimecard = async (timecardId: string) => {
  const resp = await fetch(TIMECARDS_PATH + timecardId, {
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Failed to delete timecard");
  }

  return resp.json();
};

export const updateTimecard = async (
  timecardId: string,
  data: UpdateTimecard,
) => {
  const resp = await fetch(TIMECARDS_PATH + timecardId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Failed to update timecard");
  }

  return resp.json();
};

export const createTimecard = async (data: CreateTimeCard) => {
  const resp = await fetch(TIMECARDS_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error("Failed to create user");
  }
  return resp.json();
};

export const fetchTimecard = async (timecardId: string) => {
  const resp = await fetch(TIMECARDS_PATH + timecardId);
  return await resp.json();
}