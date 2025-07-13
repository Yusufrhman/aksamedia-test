import { useSelector } from "react-redux";
import Login from "../features/auth/pages/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { RootState } from "../store/store";

export default function LoginPage() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/products");
    }
  }, [isLoggedIn]);
  return <Login></Login>;
}
