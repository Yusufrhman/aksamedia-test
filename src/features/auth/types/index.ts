import type { User } from "../../user/types";

export interface LoginResult {
  ok: boolean;
  user?: User;
  error?: LoginErrorType;
}
export interface LoginErrorType {
  username?: string;
  password?: string;
}