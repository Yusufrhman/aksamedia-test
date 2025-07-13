import { useEffect, useState } from "react";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import type { User } from "./features/user/types";
import type { RootState } from "./store/store";
import { seedDBIfEmpty } from "./utils/indexedDB";
import DashboardLayout from "./components/layout/DashboardLayout";
import { checkAuthLoader } from "./features/auth/services/authService";
import ProductPage from "./pages/ProductPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  const theme = useSelector((state: RootState) => state.theme);
  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const element = document.documentElement;
    element.classList.remove("light", "dark");
    if (theme !== "system") {
      element.classList.add(theme);
    } else {
      element.classList.add(systemTheme);
    }
  }, [theme, systemTheme]);

  // Inisialisasi data product jika belum ada di indexeddb
  useEffect(() => {
    seedDBIfEmpty();
  }, []);

  // Inisialisasi data user jika belum ada di localStorage
  useEffect(() => {
    const staticUser: User = {
      username: "myusufrahman",
      password: "aaaaaa",
      fullname: "Muhammad Yusuf Rahman",
    };

    const user = localStorage.getItem("user");
    if (!user || user === null) {
      localStorage.setItem("user", JSON.stringify(staticUser));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <DashboardLayout />,
      loader: checkAuthLoader,

      children: [
        {
          path: "",
          loader: () => {
            return redirect("/products");
          },
        },
        {
          path: "products",
          element: <ProductPage />,
        },
        {
          path: "edit-profile",
          element: <EditProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
