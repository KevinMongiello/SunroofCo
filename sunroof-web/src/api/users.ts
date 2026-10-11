import type { CreateUser, User } from "../types/user";
import { requestJson, requestVoid } from "./requests";

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
  return requestVoid(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: string) {
  return requestVoid(`/users/${id}`, {
    method: "DELETE",
  });
}
