const REPORTS_PATH = 'http://localhost:3000/reports/';

export const fetchDashboardStats = async () => {
  const resp = await fetch(REPORTS_PATH + 'dashboard');
  return await resp.json();
}