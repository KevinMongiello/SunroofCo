export const getWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now);

  const day = startOfWeek.getDay();
  const daysSinceMonday = (day + 6) % 7;

  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfNextWeek = new Date(startOfWeek);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
  return [
    startOfWeek.toISOString().slice(0, 10),
    startOfNextWeek.toISOString().slice(0, 10),
  ];
};