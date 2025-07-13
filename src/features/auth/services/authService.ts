import { redirect } from "react-router";
import { getUser } from "../../user/services/userService";
import type { LoginResult } from "../types";

function login(username: string, password: string): LoginResult {
  const user = getUser();
  const usernameIsValid = checkUserName(username);
  const passwordIsValid = checkPassword(password);

  if (!usernameIsValid) {
    return {
      ok: false,
      error: { username: "User tidak terdaftar", password: "" },
    };
  }

  if (!passwordIsValid) {
    return {
      ok: false,
      error: { username: "", password: "Password salah" },
    };
  }

  return { ok: true, user: user! };
}

function checkUserName(username: string): boolean {
  const user = getUser();
  return !!user && username.toLowerCase() === user.username.toLowerCase();
}

function checkPassword(password: string): boolean {
  const user = getUser();
  return !!user && password === user.password;
}

function isLoggedIn(): boolean {
  const isLoggedIn = localStorage.getItem("auth");
  return JSON.parse(isLoggedIn ?? "false");
}

function checkAuthLoader(): unknown {
  const isAuth = isLoggedIn();
  if (!isAuth) {
    return redirect("/login");
  } else {
    // return redirect("/products");
  }
}

export { login, checkUserName, checkPassword, isLoggedIn, checkAuthLoader };
