"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContent } from "../../redux/slices/contentSlice";
import { RootState, AppDispatch } from "../../redux/store";
import NavbarComp from "@/components/navbar";
import ServiceSectionComp from "@/components/servicesection";
import FooterComp from "@/components/footer";
import ServicesHeroComp from "@/components/services_hero";
import Loading from "@/components/laoding";

export default function Services() {
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
      <ServicesHeroComp />
      {content?.servicepage && (
        <ServiceSectionComp servicesection={content.servicepage} />
      )}

      <FooterComp footer={content?.footer ?? []} />
    </div>
  );
}
