import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
