import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

const themeData = localStorage.getItem("theme");
const initialState: ThemeMode = themeData ? JSON.parse(themeData) : "system";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (_state, action: PayloadAction<ThemeMode>) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
