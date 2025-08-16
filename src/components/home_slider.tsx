"use client";

import { HomeSlider } from "@/models/homeSliderModel";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const overlayStyle =
  "absolute inset-0 bg-gradient-to-b from-[#4B2615]/38  to-[#4B2615]/88 transition-opacity duration-1000";

interface HomeSliderProps {
  homeSlider: HomeSlider[];
}

export default function HomeSliderComp({ homeSlider }: HomeSliderProps) {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const slide = homeSlider[current];
    if (!slide || !slide.Media) return;
    if (slide.Media.ext === ".jpg" || slide.Media.ext === ".webp") {
      const timeout = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % homeSlider.length);
      }, 5000);

      return () => clearTimeout(timeout);
    }

    if (slide.Media.ext === ".mp4" && videoRef.current) {
      videoRef.current.play();
    }
  }, [current, homeSlider]);

  const handleVideoEnd = () => {
    setCurrent((prev) => (prev + 1) % homeSlider.length);
  };

  const language = useSelector((state: RootState) => state.language.lang);
  return (
    <div className="relative w-[100vw] md:w-[100%] h-[80vh] md:h-[95vh] overflow-hidden">
      {homeSlider.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.Media && slide.Media.ext === ".mp4" ? (
            <video
              ref={videoRef}
              className="w-[100vw] md:w-[100%] h-[100vh] object-cover"
              src={slide.Media.url}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
          ) : (
            <img
              className="w-[100vw] md:w-[100%] h-[100vh] object-cover"
              src={slide.Media?.url}
              alt={slide.Title}
            />
          )}

          <div className={overlayStyle}></div>

          <div
            className={`absolute inset-0 md:max-w-[90vw] mx-auto  py-20 md:py-0 text-white flex  ${
              language == "en"
                ? "flex-col gap-10 md:flex-row "
                : "flex-col gap-10 md:flex-row-reverse"
            } justify-between items-center`}
          >
            <div
              className={`md:pl-[100px]  flex flex-col justify-center ${
                language == "en"
                  ? "items-start pl-[20px] "
                  : "items-end pr-[20px]"
              }  `}
            >
              <h1 className="text-4xl md:text-5xl font-bold">{slide.Title}</h1>
              <p
                className={`mt-4 text-lg md:text-lg max-w-2xl ${
                  language === "en" ? "text-left" : "text-right"
                }`}
              >
                {slide.Description}
              </p>
              {slide.link && (
                <a
                  href={slide.link}
                  className="mt-6 inline-block px-3 py-2 text-xs md:text-sm md:px-6 md:py-3 bg-white   rounded-xl text-[#4B2615] font-semibold"
                >
                  {language == "en" ? "Learn More" : "اعرف المزيد"}
                </a>
              )}
            </div>
            <img
              src={slide.Image.url}
              alt={slide.Title}
              className="md:w-[350px] md:h-[350px] w-[200px] h-[200px] object-cover rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
