import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setTheme, type ThemeMode } from "../../features/theme/themeSlice";
import type { ReactNode } from "react";

const options: {
  mode: ThemeMode;
  icon: ReactNode;
}[] = [
  {
    mode: "light",
    icon: <Sun size={24} />,
  },
  {
    mode: "dark",
    icon: <Moon size={24} />,
  },
  {
    mode: "system",
    icon: <MonitorSmartphone size={24} />,
  },
];

export default function DarkModeOptions() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  function changeTheme(selectedTheme: ThemeMode) {
    dispatch(setTheme(selectedTheme));
  }

  return (
    <ul className="flex items-center justify-center gap-4">
      {options.map((option, index) => (
        <li key={index}>
          <button
            onClick={() => changeTheme(option.mode)}
            className={`flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110 focus:outline-none cursor-pointer ${
              theme === option.mode
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-blue-500 text-blue-100"
            }`}
          >
            {option.icon}
          </button>
        </li>
      ))}
    </ul>
  );
}
