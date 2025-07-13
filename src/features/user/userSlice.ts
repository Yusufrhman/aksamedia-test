import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("user");
const initialState = userData ? JSON.parse(userData) : {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (_state, action) => action.payload,
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
