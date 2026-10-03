import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";
import { deleteUser, fetchAllUsers } from "../api/users";
import { UserTable } from "../components/Users/UserTable";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const pageFetchUsers = useCallback(async () => {
    const users = await fetchAllUsers();
    setUsers(users);
  }, []);

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
    { onClick: () => navigate("/users/new"), label: "+ Add User" }
  ];

  return (
    <>
      <AppHeader
        h1Text="Users"
        h2Text="Manage team members and their information."
        buttonConfigs={buttonConfigs}
      />
      <UserTable users={users} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
};
