import { createSlice } from "@reduxjs/toolkit";

const authData = localStorage.getItem("auth");
const initialState = authData ? JSON.parse(authData) : false;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: () => true,
    signOut: () => false,
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
