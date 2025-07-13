// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice";
import userReducer from "../features/user/userSlice";
import themeReducer from "../features/theme/themeSlice";
import productReducer from "../features/product/slice/productSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    product: productReducer
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("auth", JSON.stringify(state.auth));
  localStorage.setItem("user", JSON.stringify(state.user));
  localStorage.setItem("theme", JSON.stringify(state.theme));
});

// Type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
