import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { UserForm } from "../components/Users/UserForm";
import { createUser, fetchUser, updateUser } from "../api/users";
import type { User, CreateUser } from "../types/user";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? "/users";
  const toNavBack = () => navigate(returnTo);
  const toUsersPage = () => navigate('/users');

  const isEditing = !!id;
  const [initialValues, setInitialValues] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      fetchUser(id).then((user) => {
        setInitialValues(user);
      });
    }
  }, [id]);

  const onSubmit = useCallback(async (data: CreateUser) => {
    if (id) {
      await updateUser(id, data);
    } else {
      await createUser(data);
    }

    toUsersPage();
  }, []);

  if (isEditing && !initialValues) {
    return <p>Loading user...</p>;
  }

  return (
    <main>
      <AppHeader
        navBack={toNavBack}
        h1Text={isEditing ? "Update User" : "Create User"}
      />
      <UserForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onCancel={() => toNavBack()}
        submitLabel={isEditing ? "Update User" : "Create User"}
      ></UserForm>
    </main>
  );
};
