"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { toggleLanguage } from "../redux/slices/languageSlice";

export default function LanguageToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);

  return (
    <button
      onClick={() => dispatch(toggleLanguage())}
      className="  pb-4 md:pb-0   text-white  text-xs"
    >
      {lang === "en" ? "Ar" : "En"}
    </button>
  );
}
