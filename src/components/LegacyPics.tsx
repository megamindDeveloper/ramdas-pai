"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/legacy/1.png",
  "/images/legacy/2.png",
  "/images/legacy/3.png",
];

export default function LegacySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate images on right arrow click
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Reorder images so that the current image is first
  const reorderedImages = [
    images[currentIndex],
    ...images.slice(currentIndex + 1),
    ...images.slice(0, currentIndex),
  ];

  return (
    <section className="py-20 px-4 lg:px-0 lg:ml-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Content */}
        <div className="space-y-6 lg:col-span-4">
          <h2 className="text-[32px] leading-[1.1] font-helvetica sm:text-3xl md:text-5xl lg:text-6xl font-medium text-black mb-6 md:mb-8">
            A Legacy in Pictures
          </h2>
          <p className="text-lg text-black font-helvetica lg:max-w-xl mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </p>
          <Link href="/glimpses-of-dr">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
              Learn more
            </button>
          </Link>

          {/* Right Button */}
          <div className="md:mt-20 cursor-pointer hidden lg:block" onClick={handleNext}>
            <svg
              width="12"
              height="21"
              viewBox="0 0 12 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.80892 1.01642e-06L12 10.5L1.80892 21L-1.74441e-06 19.1362L8.38217 10.5L-2.34405e-07 1.86375L1.80892 1.01642e-06Z"
                fill="#EF2700"
              />
            </svg>
          </div>
        </div>

        {/* Right Images (Desktop) */}
        <div className="lg:flex hidden h-[70vh] gap-4 lg:col-span-8">
          <div className="w-[50%]">
            <Image
              src={reorderedImages[0]}
              alt="legacy main"
              width={300}
              height={400}
              className="w-full h-[70vh] object-cover rounded"
            />
          </div>
          {reorderedImages.slice(1).map((img, i) => (
            <div key={i} className="flex-1">
              <Image
                src={img}
                alt={`legacy ${i}`}
                width={300}
                height={400}
                className="w-full h-[70vh] object-cover rounded"
              />
            </div>
          ))}
        </div>

        {/* Right Images (Mobile) */}
        <div className="flex lg:hidden flex-col gap-4 lg:col-span-8">
          {reorderedImages.map((img, i) => (
            <div key={i} className="flex-1">
              <Image
                src={img}
                alt={`legacy mobile ${i}`}
                width={300}
                height={400}
                className="w-full h-[50vh] object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
