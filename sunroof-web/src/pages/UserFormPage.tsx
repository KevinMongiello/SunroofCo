import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { createUser, fetchUser, updateUser } from "../api/users";
import type { User, CreateUser } from "../types/user";
import { AppHeader } from "../components/AppHeader";

export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const toUsersPage = () => navigate("/users");

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
        navBack={toUsersPage}
        h1Text={isEditing ? "Update User" : "Create User"}
      />
      <UserForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onCancel={() => toUsersPage()}
        submitLabel={isEditing ? "Update User" : "Create User"}
      ></UserForm>
    </main>
  );
};
