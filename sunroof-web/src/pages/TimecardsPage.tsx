import { useCallback, useEffect, useState } from "react";
import { deleteTimecard, fetchAllTimeCards } from "../api/timecards";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { TimecardsTable } from "../components/Timecards/TimecardsTable";
import type { TimeCardWithUser } from "../types/timecards";

export const TimecardsPage = () => {
  const navigate = useNavigate();
  const [timecards, setTimecards] = useState<TimeCardWithUser[]>([]);
  const pageFetchTimecards = useCallback(() => {
    fetchAllTimeCards({ includeUser: true }).then(setTimecards);
  }, []);

  useEffect(() => {
    pageFetchTimecards();
  }, []);

  const onDelete = useCallback(async (timecardId: string) => {
    await deleteTimecard(timecardId);
    pageFetchTimecards();
  }, []);

  const onEdit = useCallback((timecard: TimeCardWithUser) => {
    navigate("/timecards/" + timecard.id + "/edit");
  }, []);

  const buttonConfigs = [
    { onClick: () => navigate("/timecards/new"), label: "+ Add Timecard" },
  ];

  return (
    <main>
      <AppHeader
        h1Text="Timecards"
        h2Text="View and manage time entries."
        buttonConfigs={buttonConfigs}
      />
      <TimecardsTable
        timecards={timecards || []}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </main>
  );
};
