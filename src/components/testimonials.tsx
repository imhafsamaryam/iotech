"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@/models/testimonialModel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Paragraph } from "@/models/headingsModel";

interface TestimonialsProps {
  testimonials: Testimonial[];
  heading: string;
  subheading: Paragraph[];
}

export default function TestimonialsComp({
  testimonials,
  heading,
  subheading,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setIsManual(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsManual(true);
  };

  useEffect(() => {
    if (isManual) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isManual, testimonials.length]);

  useEffect(() => {
    if (isManual) {
      const timeout = setTimeout(() => setIsManual(false), 8000);
      return () => clearTimeout(timeout);
    }
  }, [isManual]);
  const language = useSelector((state: RootState) => state.language.lang);

  return (
    <section className="bg-[#4D2617] text-white py-36 px-6 md:px-20 mb-5">
      <div className="max-w-6xl mx-auto relative">
        <div
          className={`max-w-6xl mx-auto relative flex flex-col ${
            language == "en" ? "items-start" : "items-end"
          }`}
        >
          {" "}
          <h2 className={`text-3xl md:text-4xl font-bold mb-4`}>
            {heading ?? ""}{" "}
          </h2>
          <p className="text-gray-300 max-w-xl mb-16">
            {subheading?.[0]?.para ?? ""}
          </p>
        </div>

        <div className="relative max-w-6xl overflow-hidden h-[650px] md:h-[400px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col  items-center  gap-10   ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              } ${language === "en" ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="flex-shrink-0 w-full h-[350px] md:h-[400px] md:w-[40%]">
                <img
                  src={testimonial.Image.url}
                  alt={testimonial.Name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="w-full flex flex-col justify-between h-full md:w-[60%]">
                <p
                  className={`text-lg leading-relaxed tracking-wider mb-6 text-gray-300 ${
                    language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  {testimonial.Testimonial}
                </p>
                <div
                  className={`flex flex-col justify-center ${
                    language == "en" ? "items-start " : "items-end"
                  }`}
                >
                  {" "}
                  <h4 className="text-lg font-bold leading-relaxed   tracking-wider">
                    {testimonial.Name}
                  </h4>
                  <p className="text-sm text-gray-300">{testimonial.Role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex gap-4 mt-8 absolute  bottom-[-50px] z-20 ${
            language === "en" ? "right-0" : "left-0"
          }`}
        >
          <button
            onClick={prevSlide}
            className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition ${
              currentIndex === 0
                ? "bg-white/20 hover:bg-white/30 "
                : "bg-white text-black hover:bg-gray-200"
            }   `}
            disabled={currentIndex === 0}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - 1}
            className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition ${
              currentIndex >= testimonials.length - 1
                ? "bg-white/20 hover:bg-white/30 "
                : " bg-white text-black hover:bg-gray-200 "
            } `}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
