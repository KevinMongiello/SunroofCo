const TIMECARDS_PATH = "http://localhost:3000/timecards/";

export const fetchAllTimeCards = async ({
  includeUser,
  limit,
}: {
  includeUser?: boolean;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (includeUser) params.set('includeUser', 'true');
  if (limit && Number.isInteger(limit) && limit > 0) params.set('limit', String(limit));
  const resp = await fetch(`${TIMECARDS_PATH}?${params.toString()}`);
  return await resp.json();
};
