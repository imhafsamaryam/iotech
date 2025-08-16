import { HomeSlider } from "@/models/homeSliderModel";
import { NavbarModel } from "@/models/navbarModel";
import { Team } from "@/models/teamModel";
import { Testimonial } from "@/models/testimonialModel";
import axios from "axios";
import { ServicePageResponse } from "@/models/servicepageModel";
import { FooterItem } from "@/models/footerModel";
import { HeadingsModel } from "@/models/headingsModel";

const API_BASE = "https://sacred-renewal-8564485713.strapiapp.com/api";

export interface ContentData {
  teams: Team[];
  testimonials: Testimonial[];
  homeSlider: HomeSlider[];
  navbar: NavbarModel[];
  servicepage: ServicePageResponse;
  footer: FooterItem[];
  headings: HeadingsModel[];
}

export async function fetchAllContent(locale: string): Promise<ContentData> {
  const endpoints = [
    `${API_BASE}/teams?locale=${locale}&populate=*`,
    `${API_BASE}/testimonials?locale=${locale}&populate=*`,
    `${API_BASE}/home-sliders?locale=${locale}&populate=*`,
    `${API_BASE}/navbars?locale=${locale}&populate=navbar_sublinks`,
    `${API_BASE}/servicedetail?locale=${locale}&populate[content][populate]=*`,
    `${API_BASE}/footers?locale=${locale}&populate=*`,
    `${API_BASE}/headings?locale=${locale}&populate[headings][populate]=*`,
  ];

  const [
    teams,
    testimonials,
    homeSlider,
    navbar,
    servicepage,
    footer,
    headings,
  ] = await Promise.all(
    endpoints.map((url) => axios.get(url).then((res) => res.data.data))
  );

  return {
    teams,
    testimonials,
    homeSlider,
    navbar,
    servicepage,
    footer,
    headings,
  };
}
