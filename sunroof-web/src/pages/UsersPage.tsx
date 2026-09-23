import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";
import { deleteUser, fetchAllUsers } from "../api/users";
import { UsersTable } from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";

export const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const pageFetchUsers = useCallback(async () => {
    const users = await fetchAllUsers();
    setUsers(users);
  }, [setUsers]);

  useEffect(() => {
    pageFetchUsers();
  }, []);

  const onDelete = useCallback(async (userId: string) => {
    await deleteUser(userId);
    pageFetchUsers();
  }, []);

  const onEdit = useCallback((user: User) => {
    navigate("/users/" + user.id + "/edit");
  }, []);

  const buttonConfigs = [
    { onClick: () => navigate("/users/new"), label: "+ Add User" },
    { onClick: () => {}, label: 'hi there'}
  ];

  return (
    <>
      <AppHeader
        h1="Users"
        h2="Manage team members and their information."
        buttonConfigs={buttonConfigs}
      />
      <UsersTable users={users || []} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
};
