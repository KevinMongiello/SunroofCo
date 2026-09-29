import type { CreateUser } from "../types/user";
const USERS_PATH = "http://localhost:3000/users/";

export const fetchAllUsers = async () => {
  const resp = await fetch(USERS_PATH);
  return await resp.json();
};

export const fetchUser = async (id: string) => {
  const resp = await fetch(USERS_PATH + id);
  return await resp.json();
}

export const createUser = async (data: CreateUser) => {
  const resp = await fetch(USERS_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error("Failed to create user");
  }
  return resp.json();
};

export const deleteUser = async (userId: string) => {
  const resp = await fetch(USERS_PATH + userId, {
    method: "DELETE",
  });

  if (!resp.ok) {
    throw new Error("Failed to delete user");
  }

  return resp.json();
};

export const updateUser = async (id: string, data: CreateUser) => {
  const resp = await fetch(USERS_PATH + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Failed to update user");
  }

  return resp.json();
};
