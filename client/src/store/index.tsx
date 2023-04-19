import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import languageReducer from "../features/language/languageSlice";
import templateVersionReducer from "../features/templateVersion/templateVersionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    templateVersion: templateVersionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
