import type { CreateUser, User } from "../types/user";
import { requestJson } from "./requests";

export function fetchAllUsers() {
  return requestJson<User[]>("/users");
}

export function fetchUser(id: string) {
  return requestJson<User | null>(`/users/${id}`);
}

export function createUser(data: CreateUser) {
  return requestJson<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(id: string, data: Partial<CreateUser>) {
  return requestJson<unknown>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: string) {
  return requestJson<unknown>(`/users/${id}`, {
    method: "DELETE",
  });
}