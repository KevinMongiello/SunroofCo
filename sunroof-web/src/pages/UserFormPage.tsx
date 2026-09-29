import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { createUser, fetchUser, updateUser } from "../api/users";
import type { User, CreateUser } from "../types/user";
import { ArrowLeft } from "lucide-react";

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
      <button type="button" onClick={() => toUsersPage()}>
        <ArrowLeft size={18} />
      </button>
      <h1>{isEditing ? "Update User" : "Create User"}</h1>
      <UserForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onCancel={() => toUsersPage()}
        submitLabel={isEditing ? "Update User" : "Create User"}
      ></UserForm>
    </main>
  );
};
