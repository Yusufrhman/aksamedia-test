import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import type { RootState } from "../../store/store";

export default function DashboardLayout({}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <>
      {/* <ProductProvider> */}
      <Header />
      <Outlet />
      {/* </ProductProvider> */}
    </>
  );
}
