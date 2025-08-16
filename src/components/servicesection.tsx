"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ServicePageResponse } from "@/models/servicepageModel";
import { useSearchParams } from "next/navigation";

interface ServiceSectionProps {
  servicesection: ServicePageResponse;
}

export default function ServiceSectionComp({
  servicesection,
}: ServiceSectionProps) {
  const searchParams = useSearchParams();
  const title = searchParams?.get("title");
  const language = useSelector((state: RootState) => state.language.lang);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
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
      <h1
        className={`text-[#4B2615] mb-6 text-2xl font-semibold ${
          language == "en" ? "text-left" : "text-right"
        } `}
      >
        {title}
      </h1>

      {servicesection.content.map((block) => (
        <section key={block.id}>
          {block.sideHeading && (
            <div
              className={`text-sm text-[#4B2615] pb-4 font-semibold  ${
                language == "en" ? "text-left" : "text-right"
              } `}
            >
              {block.sideHeading}
            </div>
          )}
          {block.paragraphs.map((p) => (
            <p
              key={p.id}
              className={`text-[#1E1E1E] text-sm ml-6 pb-2 ${
                language == "en" ? "text-left" : "text-right"
              }`}
            >
              {p.para}
            </p>
          ))}
          {block.bulletpoints && block.bulletpoints.length > 0 && (
            <ul>
              {block.bulletpoints.map((bp) => (
                <li
                  key={bp.id}
                  className={`flex ${
                    language == "en" ? "flex-row" : "flex-row-reverse"
                  }  items-start gap-2 pb-4 ml-6`}
                >
                  <img
                    src="/bullet.svg"
                    alt="bullet"
                    className="w-2 h-2 mx-2 mt-1"
                  />
                  <span className="text-[#4B2615] font-semibold text-sm">
                    {bp.point}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
