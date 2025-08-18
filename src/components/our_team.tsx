"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

import { Team } from "@/models/teamModel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Paragraph } from "@/models/headingsModel";

interface OurTeamProps {
  teamMembers: Team[];
  heading: string;
  subheading: Paragraph[];
}

export default function OurTeamComp({
  teamMembers,
  heading,
  subheading,
}: OurTeamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < teamMembers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const language = useSelector((state: RootState) => state.language.lang);

  return (
    <section className=" py-16 md:py-32 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-6  relative flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-[#4B2615]">{heading}</h2>
        <p className="text-[#5e5e5e] text-center md:max-w-[40vw]  mb-10 md:mb-20">
          {subheading?.[0]?.para ?? ""}
        </p>

        <div className="max-w-6xl    overflow-hidden">
          <div className="flex flex-col md:flex-row transition-transform duration-500 ease-in-out">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="md:w-1/3 flex-shrink-0 md:px-3">
                <div
                  className={` transition duration-300 md:p-4 flex flex-col items-center`}
                >
                  <img
                    src={member.Image.url}
                    alt={member.Name}
                    className="  mb-4 w-full h-60 object-cover"
                  />
                  <h3 className="text-lg   text-[#4B2615] md:text-center">
                    {member.Name}
                  </h3>
                  <p className="text-[12px] text-gray-500 tracking-widest uppercase mb-4 md:text-center">
                    {member.Role}
                  </p>
                  <div className="flex md:justify-center gap-4 text-[#4B2615] mb-8 md:mb-0">
                    <img className="w-4 h-4 " src={"/msg.svg"} alt={"Logo"} />
                    <img className="w-4 h-4 " src={"/call.svg"} alt={"Logo"} />
                    <img
                      className="w-4 h-4 "
                      src={"/watsapp.svg"}
                      alt={"Logo"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="hidden md:block">
            <button
              // onClick={prevSlide}
              className="absolute left-0 bottom-[30%]       "
            >
              <FaArrowLeft
                className={`  text-[#4B2615] w-6 h-6
                 `}
              />
            </button>
            <button
              // onClick={nextSlide}
              className="absolute right-0 bottom-[30%]       "
              disabled={currentIndex >= teamMembers.length - 3}
            >
              <FaArrowRight
                className={` text-[#4B2615] w-6 h-6
                 `}
              />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
