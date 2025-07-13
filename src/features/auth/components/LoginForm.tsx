import { useState, type FormEvent } from "react";
import MainButton from "../../../components/buttons/MainButton";
import Input from "../../../components/inputs/Input";
import { useDispatch } from "react-redux";
import { login } from "../services/authService";
import { validateCredentials } from "../../../utils/validation";
import type { LoginErrorType } from "../types";
import { signIn } from "../slice/authSlice";
import { updateUser } from "../../user/userSlice";
import { getUser } from "../../user/services/userService";

export default function LoginForm() {
  const [error, setError] = useState<LoginErrorType>({});

  // ini cuma buat placeholder login biar ga lupa username sama password
  const user = getUser();

  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enteredData = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };

    setError({});

    const error: LoginErrorType = validateCredentials(
      enteredData.username,
      enteredData.password
    );

    if (error.username || error.password) {
      setError(error);
      return;
    }

    const res = login(enteredData.username, enteredData.password);
    if (!res.ok) {
      setError(res.error ?? {});
      return;
    }
    dispatch(signIn());
    dispatch(updateUser(res.user));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Input
        id="username"
        label="Enter your Username"
        placeholder="John Doe"
        type="text"
        defaultValue={user?.username}
        error={error.username}
      />
      <Input
        id="password"
        label="Enter your Password"
        placeholder="Password"
        type="password"
        defaultValue={user?.password}
        error={error.password}
      />
      <MainButton className="w-full mt-2" type="submit">
        Login
      </MainButton>
    </form>
  );
}
