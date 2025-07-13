import type { User } from "../types";

function getUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : null;
}

export { getUser };
