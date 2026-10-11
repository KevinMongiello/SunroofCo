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
    if (id) {
      const record = await fetchTimecard(id);
      if (!record) throw new Error("Timecard not found");
      return { record, userId: record.userId };
    }
    const users = await fetchAllUsers();
    if (!users[0]) throw new Error("No users available");
    return { record: null, userId: users[0].id };
  }, [id]);
  const query = useApiQuery(
    load,
    "Unable to prepare the timecard. Check that the timecard exists and at least one user is available.",
  );
  const initialValues = query.data?.record ?? null;

  async function onSubmit(data: CreateTimeCardForm) {
    if (id) {
      await updateTimecard(id, data);
    } else {
      await createTimecard({ ...data, userId: query.data!.userId });
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
          submitLabel={isEditing ? "Update Timecard" : "Create Timecard"}
          onSubmit={onSubmit}
          onCancel={() => toNavBack()}
        ></TimecardForm>
      )}
    </main>
  );
};
