import { useApiQuery } from "../hooks/useApiQuery";
import { RequestStatus } from "../components/RequestStatus/RequestStatus";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import type { CreateTimeCardForm } from "../types/timecards";
import {
  createTimecard,
  fetchTimecard,
  updateTimecard,
} from "../api/timecards";
import { TimecardForm } from "../components/Timecards/TimecardForm";
import { fetchAllUsers } from "../api/users";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const TimecardFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? "/timecards";
  const toNavBack = () => navigate(returnTo);
  const toTimecardsPage = () => navigate("/timecards");

  const isEditing = !!id;
  const load = useCallback(async () => {
    const [users, record] = await Promise.all([
      fetchAllUsers(),
      id ? fetchTimecard(id) : Promise.resolve(null),
    ]);
    if (id && !record) throw new Error("Timecard not found");
    if (!users[0]) throw new Error("No workers available");
    return { record, users };
  }, [id]);
  const query = useApiQuery(
    load,
    "Unable to prepare the timecard. Check that the timecard exists and at least one worker is available.",
  );
  const initialValues = query.data?.record ?? null;

  async function onSubmit(data: CreateTimeCardForm) {
    if (id) {
      await updateTimecard(id, data);
    } else {
      await createTimecard(data);
    }
    toTimecardsPage();
  }

  return (
    <main>
      <AppHeader
        navBack={toNavBack}
        h1Text={isEditing ? "Update Timecard" : "Create Timecard"}
      />
      <RequestStatus {...query} />
      {!query.isLoading && !query.error && (
        <TimecardForm
          initialValues={initialValues}
          users={query.data?.users ?? []}
          submitLabel={isEditing ? "Update Timecard" : "Create Timecard"}
          onSubmit={onSubmit}
          onCancel={() => toNavBack()}
        ></TimecardForm>
      )}
    </main>
  );
};
