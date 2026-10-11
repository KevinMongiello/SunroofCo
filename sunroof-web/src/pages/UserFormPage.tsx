import { useApiQuery } from "../hooks/useApiQuery";
import { RequestStatus } from "../components/RequestStatus/RequestStatus";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { UserForm } from "../components/Users/UserForm";
import { createUser, fetchUser, updateUser } from "../api/users";
import type { CreateUser } from "../types/user";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? "/users";
  const toNavBack = () => navigate(returnTo);
  const toUsersPage = () => navigate("/users");

  const isEditing = !!id;
  const load = useCallback(async () => {
    if (!id) return null;
    const record = await fetchUser(id);
    if (!record) throw new Error("User not found");
    return record;
  }, [id]);
  const query = useApiQuery(
    load,
    "Unable to load this user. It may no longer exist.",
  );
  const initialValues = query.data ?? null;

  async function onSubmit(data: CreateUser) {
    if (id) {
      await updateUser(id, data);
    } else {
      await createUser(data);
    }
    toUsersPage();
  }

  return (
    <main>
      <AppHeader
        navBack={toNavBack}
        h1Text={isEditing ? "Update User" : "Create User"}
      />
      <RequestStatus {...query} />
      {!query.isLoading && !query.error && (
        <UserForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          onCancel={() => toNavBack()}
          submitLabel={isEditing ? "Update User" : "Create User"}
        ></UserForm>
      )}
    </main>
  );
};
