import { configureStore } from "@reduxjs/toolkit";
import banjirReducer from "../slice/banjirSlice";
import authReducer from "../slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    banjir: banjirReducer,
  },
});
