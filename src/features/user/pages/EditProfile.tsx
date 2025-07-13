import { useDispatch, useSelector } from "react-redux";
import { useState, type FormEvent, type ChangeEvent } from "react";
import type { AppDispatch, RootState } from "../../../store/store";
import type { User } from "../types";
import { validateUpdateUserInput } from "../../../utils/validation";
import { checkPassword } from "../../auth/services/authService";
import { updateUser } from "../userSlice";
import Input from "../../../components/inputs/Input";
import MainButton from "../../../components/buttons/MainButton";

interface ErrorState {
  fullname?: string;
  username?: string;
  password?: string;
}

export default function EditProfile() {
  const userData = useSelector((state: RootState) => state.user);

  const [error, setError] = useState<ErrorState>({});
  const [user, setUser] = useState<User>({ ...userData });
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enteredData = Object.fromEntries(formData.entries()) as {
      fullname: string;
      username: string;
      password: string;
    };

    setError({});

    const errorInput = validateUpdateUserInput(
      enteredData.fullname,
      enteredData.username
    );

    if (errorInput.fullname || errorInput.username) {
      setError(errorInput);
      return;
    }

    const isCorrectPassword = checkPassword(enteredData.password);
    if (!isCorrectPassword) {
      setError((prev) => ({ ...prev, password: "Password salah" }));
      return;
    }

    dispatch(updateUser(enteredData));
    setUpdateStatus("User updated successfully!");
  }

  return (
    <main className="w-full flex items-center justify-center transition-colors duration-300">
      <div className="max-w-sm w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg mx-5 my-10 transition-all duration-300">
        <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center">
          Edit Profil
        </h1>
        {updateStatus && (
          <div className="p-3 bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100 rounded mb-4 text-center transition-all duration-300">
            {updateStatus}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            id="fullname"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={user.fullname}
            className="text-neutral-900 dark:text-neutral-100"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, fullname: e.target.value })
            }
            error={error.fullname}
          />
          <Input
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            className="text-neutral-900 dark:text-neutral-100"
            value={user.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, username: e.target.value })
            }
            error={error.username}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="text-neutral-900 dark:text-neutral-100"
            error={error.password}
          />
          <MainButton type="submit" className="w-full mt-2">
            Save
          </MainButton>
        </form>
      </div>
    </main>
  );
}
