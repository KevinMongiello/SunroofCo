import { useApiQuery } from "../hooks/useApiQuery";
import { RequestStatus } from "../components/RequestStatus/RequestStatus";
import { useState } from "react";
import { deleteTimecard, fetchAllTimeCards } from "../api/timecards";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { TimecardsTable } from "../components/Timecards/TimecardsTable";
import type { TimeCardWithUser } from "../types/timecards";

const loadTimecards = () => fetchAllTimeCards({ includeUser: true });

export const TimecardsPage = () => {
  const navigate = useNavigate();
  const query = useApiQuery(
    loadTimecards,
    "Unable to load timecards. Please try again.",
  );
  const [deleteError, setDeleteError] = useState("");

  async function onDelete(id: string) {
    setDeleteError("");
    try {
      await deleteTimecard(id);
      query.retry();
    } catch {
      setDeleteError("Unable to delete the timecard. Please try again.");
    }
  }

  const onEdit = (row: TimeCardWithUser) =>
    navigate("/timecards/" + row.id + "/edit");

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
      <RequestStatus {...query} />
      {deleteError && <p role="alert">{deleteError}</p>}
      {!query.isLoading && !query.error && (
        <TimecardsTable
          timecards={query.data ?? []}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </main>
  );
};
