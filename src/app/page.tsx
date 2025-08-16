"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContent } from "../redux/slices/contentSlice";
import { RootState, AppDispatch } from "../redux/store";
import HomeSliderComp from "@/components/home_slider";
import OurTeamComp from "@/components/our_team";
import TestimonialsComp from "@/components/testimonials";
import NavbarComp from "@/components/navbar";
import FooterComp from "@/components/footer";
import Loading from "@/components/laoding";

export default function Home() {
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
      <HomeSliderComp homeSlider={content?.homeSlider ?? []} />
      <OurTeamComp
        teamMembers={content?.teams ?? []}
        subheading={content?.headings[0].headings[0].paragraphs ?? []}
        heading={content?.headings[0].headings[0].sideHeading ?? ""}
      />
      <TestimonialsComp
        testimonials={content?.testimonials ?? []}
        subheading={content?.headings[0].headings[1].paragraphs ?? []}
        heading={content?.headings[0].headings[1].sideHeading ?? ""}
      />

      <FooterComp footer={content?.footer ?? []} />
    </div>
  );
}
