import { useApiQuery } from "../hooks/useApiQuery";
import { RequestStatus } from "../components/RequestStatus/RequestStatus";
import { useState } from "react";
import type { User } from "../types/user";
import { deleteUser, fetchAllUsers } from "../api/users";
import { UserTable } from "../components/Users/UserTable";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

const loadUsers = () => fetchAllUsers();

export const UsersPage = () => {
  const navigate = useNavigate();
  const query = useApiQuery(
    loadUsers,
    "Unable to load workers. Please try again.",
  );
  const [deleteError, setDeleteError] = useState("");

  async function onDelete(id: string) {
    setDeleteError("");
    try {
      await deleteUser(id);
      query.retry();
    } catch {
      setDeleteError("Unable to delete the worker. Please try again.");
    }
  }

  const onEdit = (row: User) => navigate("/users/" + row.id + "/edit");

  const buttonConfigs = [
    { onClick: () => navigate("/users/new"), label: "+ Add Worker" },
  ];

  return (
    <main>
      <AppHeader
        h1Text="Workers"
        h2Text="Manage team members and their information."
        buttonConfigs={buttonConfigs}
      />
      <RequestStatus {...query} />
      {deleteError && <p role="alert">{deleteError}</p>}
      {!query.isLoading && !query.error && (
        <UserTable
          users={query.data ?? []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </main>
  );
};
