import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { CreateTimeCardForm, TimeCard } from "../types/timecards";
import {
  createTimecard,
  fetchTimecard,
  updateTimecard,
} from "../api/timecards";
import { TimecardForm } from "../components/Timecards/TimecardForm";
import { fetchAllUsers } from "../api/users";
import { AppHeader } from "../components/AppHeader/AppHeader";

// Use this as default FK, since selecting a user
// as part of the "new timecard" workflow
// is out of scope for this project.
let DEFAULT_USER_ID = "0000-0000-0000-00000";

export const TimecardFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? "/timecards";
  const toNavBack = () => navigate(returnTo);
  const toTimecardsPage = () => navigate('/timecards');

  const isEditing = !!id;
  const [initialValues, setInitialValues] = useState<TimeCard | null>(null);

  useEffect(() => {
    fetchAllUsers().then((users) => {
      if (users?.[0]) {
        DEFAULT_USER_ID = users[0].id;
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      fetchTimecard(id).then((data) => {
        setInitialValues(data);
      });
    }
  }, [id]);

  const onSubmit = useCallback(async (data: CreateTimeCardForm) => {
    if (id) {
      await updateTimecard(id, data);
    } else {
      await createTimecard({ ...data, userId: DEFAULT_USER_ID });
    }

    toTimecardsPage();
  }, []);

  if (isEditing && !initialValues) {
    return <p>Loading timecards...</p>;
  }

  return (
    <main>
      <AppHeader
        navBack={toNavBack}
        h1Text={isEditing ? "Update Timecard" : "Create Timecard"}
      />
      <TimecardForm
        initialValues={initialValues}
        submitLabel={isEditing ? "Update Timecard" : "Create Timecard"}
        onSubmit={onSubmit}
        onCancel={() => toNavBack()}
      ></TimecardForm>
    </main>
  );
};
