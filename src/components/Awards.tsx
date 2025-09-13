"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

const awards = [
  {
    title: "Golden Peacock Lifetime Achievement Award (2011)",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
  },
  { title: "Padma Bhushan (2011)", subtitle: "Government of India" },
  { title: "Dato’s Award (2011)", subtitle: "Government of Melaka, Malaysia" },
  {
    title: "World Konkani Convention Award (1995)",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
  },
  { title: "Award of Philanthropy (1992)", subtitle: "Bunt’s Sangha, Bombay" },
  {
    title: "Seva Ratna Prashasti Award (1994)",
    subtitle: "Kanakuri Memorial Trust, South Canara",
  },
  { title: "Suvarna Karnataka Award (2004)", subtitle: "Government of Karnataka Honour" },
  {
    title: "Chanakya Award (2002)",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
  },
];

export default function Awards() {
  // columns: 1 (mobile), 2 (sm >= 640px), 3 (md >= 768px)
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === "undefined") return 3;
    if (window.matchMedia("(min-width: 768px)").matches) return 3;
    if (window.matchMedia("(min-width: 640px)").matches) return 2;
    return 1;
  });

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(min-width: 768px)").matches) setCols(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setCols(2);
      else setCols(1);
    }
    // initial
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const remainder = awards.length % cols;
  const splitIndex = remainder === 0 ? awards.length : awards.length - remainder;
  const fullGridItems = awards.slice(0, splitIndex); // rendered in grid
  const lastRowItems = awards.slice(splitIndex); // rendered centered if any

  const Card = ({ award }: { award: { title: string; subtitle?: string } }) => (
    <div className="w-full max-w-sm xl:max-w-[95%]">
      <div className="border border-[#E85B25] rounded-lg p-6 text-center shadow-sm hover:shadow-md transition h-56 flex flex-col justify-center">
        <h3 className="text-[#404040] font-medium text-2xl md:text-3xl">{award.title}</h3>
        {award.subtitle && <p className="text-lg text-gray-600 font-medium mt-2">{award.subtitle}</p>}
      </div>
    </div>
  );

  return (
    <section className="pt-16 lg:py-16">
      <h2 className="font-helvetica text-center font-medium leading-none text-[36px] lg:text-[64px]">
        <AnimatedTextCharacter text="Awards & Recognitions" />
      </h2>

      {/* Images row (unchanged) */}
      <div className="w-full flex justify-center items-center max-w-6xl xl:max-w-7xl px-4 mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full">
          <div className="flex justify-center items-center">
            <Image src="/images/awards/1.png" alt="Award Left" width={350} height={350} className="rounded-lg shadow-lg object-contain" />
          </div>

          <div className="flex justify-center">
            <Image src="/images/awards/2.png" alt="Award Center" width={500} height={700} className="rounded-lg shadow-lg object-contain h-full" />
          </div>

          <div className="flex justify-center items-center">
            <Image src="/images/awards/3.png" alt="Award Right" width={350} height={350} className="rounded-lg shadow-lg object-contain" />
          </div>
        </div>
      </div>

      {/* Awards: full rows in grid */}
      {fullGridItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl xl:max-w-[95%] px-4 py-6 mx-auto justify-items-center">
          {fullGridItems.map((award, i) => (
            <Card key={i} award={award} />
          ))}
        </div>
      )}

      {/* Last partial row (if exists) — centered */}
      {lastRowItems.length > 0 && (
        <div className="flex justify-center gap-6 max-w-7xl mx-auto px-4 py-6">
          {lastRowItems.map((award, i) => (
            <Card key={`last-${i}`} award={award} />
          ))}
        </div>
      )}
    </section>
  );
}
