import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  lang: "en" | "ar";
}

const initialState: LanguageState = {
  lang: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<"en" | "ar">) {
      state.lang = action.payload;
    },
    toggleLanguage(state) {
      state.lang = state.lang === "en" ? "ar" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
