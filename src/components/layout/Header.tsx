import { useDispatch, useSelector } from "react-redux";
import DarkModeOptions from "./DarkModeOptions";
import type { RootState } from "../../store/store";
import Dropdown from "../dropdown/Dropdown";
import { signOut } from "../../features/auth/slice/authSlice";
import { Link } from "react-router";

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 w-full sticky top-0 py-4 shadow-md z-50">
      <div className="flex items-center justify-center sm:justify-end gap-8 w-[90%] mx-auto">
        <DarkModeOptions />
        <Dropdown className={"text-sm w-fit items-right"}>
          <Dropdown.Title className="py-2 text-white text-base hover:text-blue-100 transition-colors duration-300">
            {user.username || "Guest"}
          </Dropdown.Title>
          <Dropdown.Menu className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col right-0 shadow-lg rounded-md w-fit">
            <Link to={"/products"} className="w-full">
              <Dropdown.Item className="hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors duration-300">
                Dashboard
              </Dropdown.Item>
            </Link>
            <Link to={"/edit-profile"} className="w-full">
              <Dropdown.Item className="hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors duration-300">
                Edit Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Item
              onClick={() => {
                dispatch(signOut());
              }}
              className="hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors duration-300"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
