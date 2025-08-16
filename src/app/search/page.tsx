"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContent } from "../../redux/slices/contentSlice";
import { RootState, AppDispatch } from "../../redux/store";
import NavbarComp from "@/components/navbar";
import FooterComp from "@/components/footer";
import ServicesHeroComp from "@/components/services_hero";
import SearchComp from "@/components/searchComp";
import Loading from "@/components/laoding";

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const content = useSelector((state: RootState) => state.content.data[lang]);
  const loading = useSelector((state: RootState) => state.content.loading);

  useEffect(() => {
    if (!content) {
      dispatch(loadContent(lang));
    }
  }, [lang, dispatch]);

  if (loading) return <Loading />;

  return (
    <div>
      <NavbarComp navbar={content?.navbar ?? []} />
      <ServicesHeroComp />{" "}
      {content?.servicepage && (
        <SearchComp servicesection={content.servicepage} />
      )}
      <FooterComp footer={content?.footer ?? []} />
    </div>
  );
}
