"use client";

import React from "react";

const overlayStyle =
  "absolute inset-0 bg-gradient-to-b from-[#4B2615]/38  to-[#4B2615]/88 transition-opacity duration-1000";

export default function ServicesHeroComp() {
  return (
    <div className="relative w-[100vw] md:w-[100%] h-[70vh] md:h-[70vh] overflow-hidden">
      <img
        className="w-[100vw] h-[70vh] object-cover"
        src={"/hero.jpg"}
        alt={"hero image"}
      />

      <div className={overlayStyle}></div>
    </div>
  );
}
