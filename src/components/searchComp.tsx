"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ServicePageResponse } from "@/models/servicepageModel";
import { useSearchParams } from "next/navigation";

interface ServiceSectionProps {
  servicesection: ServicePageResponse;
}

type SearchResult = {
  text: string;
  link: string;
};
export default function SearchComp({ servicesection }: ServiceSectionProps) {
  const language = useSelector((state: RootState) => state.language.lang);
  const searchParams = useSearchParams();
  const title = searchParams?.get("searchText");
  const [results, setResults] = useState<SearchResult[]>([]);
  const pageLink = "/services";
  React.useEffect(() => {
    handleSearch();
  }, [title, servicesection]);

  const handleSearch = async () => {
    const matched: SearchResult[] = [];

    servicesection.content.forEach((section) => {
      if (
        section.sideHeading &&
        title &&
        section.sideHeading.toLowerCase().includes(title.toLowerCase())
      ) {
        matched.push({ text: section.sideHeading, link: pageLink });
      }

      section.paragraphs.forEach((p) => {
        if (
          p.para &&
          title &&
          p.para.toLowerCase().includes(title.toLowerCase())
        ) {
          matched.push({ text: p.para, link: pageLink });
        }
      });
    });

    setResults(matched);
  };

  return (
    <div className="max-w-5xl h-[80vh] overflow-auto max-h-[100vh] mx-auto px-4 py-10">
      <div
        className={`flex ${
          language == "en" ? "flex-row" : "flex-row-reverse"
        } items-center pb-4 cursor-pointer`}
        onClick={() => window.history.back()}
      >
        {language == "en" ? (
          <img src="/fa-right.svg" alt="fa-right" className="w-3 h-3 mx-1" />
        ) : (
          <img
            src="/fa-right.svg"
            alt="fa-right"
            className="w-3 h-3 mx-1"
            style={{ transform: "scaleX(-1)" }}
          />
        )}

        <div className="text-[#4B2615] text-sm">
          {language == "en" ? "Back" : "اذهب للخلف"}
        </div>
      </div>
      {results.length === 0 ? (
        <div
          className={`text-gray-500 mt-6 ${
            language == "en" ? "text-left" : "text-right"
          } `}
        >
          {language == "en" ? "No results found." : "لم يتم العثور على نتائج."}
        </div>
      ) : (
        <div
          className={`flex ${
            language == "en" ? "flex-row" : "flex-row-reverse"
          } gap-8 items-center justify-start`}
        >
          <h2
            className={`text-[#4B2615] mb-6 text-2xl font-semibold ${
              language == "en" ? "text-left" : "text-right"
            } `}
          >
            {language == "en" ? "Services" : "الخدمات"}
          </h2>

          <ul className="w-full">
            {results.map((r, idx) => (
              <li
                className={`text-[#4B2615] mb-6 text-sm   ${
                  language == "en" ? "text-left" : "text-right"
                } `}
                key={idx}
              >
                <div className="pb-4"> {`${title}...`}</div>
                <a href={r.link} className="underline">
                  {" "}
                  {language == "en" ? " Read More" : "اقرأ المزيد"}
                </a>
                <hr className="border-b-0 mt-6 border-[#4B2615]" />{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
