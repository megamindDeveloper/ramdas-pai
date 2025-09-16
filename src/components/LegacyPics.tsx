"use client";
import React, { useState, useEffect, useCallback } from "react"; // 1. Import useEffect and useCallback
import Image from "next/image";
import Link from "next/link";

const images = ["/images/legacy/4.jpg", "/images/legacy/2.png", "/images/legacy/10.png"];

export default function LegacySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Wrap handleNext in useCallback to prevent it from being recreated on every render.
  // This makes it a stable dependency for our useEffect hook.
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []); // The dependency array is empty because `images.length` is constant.

  // 3. Add the useEffect hook to create and clean up the interval.
  useEffect(() => {
    // Set up the interval to call handleNext every 2 seconds (2000 milliseconds)
    const intervalId = setInterval(handleNext, 2000);

    // This is the cleanup function.
    // It runs when the component unmounts to prevent memory leaks.
    return () => clearInterval(intervalId);
  }, [handleNext]); // The effect depends on the handleNext function.

  // Reorder images so that the current image is first
  const reorderedImages = [images[currentIndex], ...images.slice(currentIndex + 1), ...images.slice(0, currentIndex)];

  return (
    <section className="py-20 pl-4 lg:px-0 lg:ml-10 lg2:ml-[8rem] xl:ml-[21rem] ">
      <div className="grid w-full grid-cols-2 lg:grid-cols-12 gap-8 ">
        {/* Left Content */}
        <div className="space-y-6 lg:col-span-4 hidden md:block">
          <h2 className="text-[32px] leading-[1.1] font-sans sm:text-3xl md:text-3xl lg:text-[44px] font-semibold text-black mb-6 md:mb-8">
            A Legacy in <br /> Pictures
          </h2>
          <p className="text-lg text-black font-sans lg:max-w-xl mx-auto md:mx-0">
            Every picture tells a story, and every story echoes a vision. From nurturing Manipal into a global education hub to shaping lives across
            continents, Dr. Ramdas M. Pai’s journey is one of purpose, perseverance, and progress.
          </p>
          <Link href="/glimpses-of-dr">
            <button className="bg-red-600 hidden md:block text-white px-12 py-3 cursor-pointer text-base  hover:bg-red-700 transition">
              Learn more
            </button>
          </Link>

          <div className="md:mt-20  ">
            <button className="cursor-pointer" onClick={handleNext}>
              <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.80892 1.01642e-06L12 10.5L1.80892 21L-1.74441e-06 19.1362L8.38217 10.5L-2.34405e-07 1.86375L1.80892 1.01642e-06Z"
                  fill="#EF2700"
                />
              </svg>
            </button>
          </div>
          <Link href="/glimpses-of-dr">
            <button className="bg-red-600 w-full md:hidden text-white px-5 py-3 cursor-pointer text-base  hover:bg-red-700 transition">
              Learn more
            </button>
          </Link>
        </div>



         <div className="space-y-6 lg:col-span-4 flex md:hidden flex-col justify-between ">
          <h2 className="text-[32px] leading-[1.1] font-sans sm:text-3xl md:text-3xl lg:text-[44px] font-semibold text-black mb-6 md:mb-8">
            A Legacy in <br /> Pictures
          </h2>
          <p className="text-lg text-black font-sans lg:max-w-xl mx-auto md:mx-0">
            Every picture tells a story, and every story echoes a vision. From nurturing Manipal into a global education hub to shaping lives across
            continents, Dr. Ramdas M. Pai’s journey is one of purpose, perseverance, and progress.
          </p>
          <Link href="/glimpses-of-dr">
            <button className="bg-red-600 hidden md:block text-white px-12 py-3 cursor-pointer text-base  hover:bg-red-700 transition">
              Learn more
            </button>
          </Link>

          <div className="md:mt-20  ">
            <button className="cursor-pointer" onClick={handleNext}>
              <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.80892 1.01642e-06L12 10.5L1.80892 21L-1.74441e-06 19.1362L8.38217 10.5L-2.34405e-07 1.86375L1.80892 1.01642e-06Z"
                  fill="#EF2700"
                />
              </svg>
            </button>
          </div>
          <Link href="/glimpses-of-dr">
            <button className="bg-red-600 w-full md:hidden text-white px-5 py-3 cursor-pointer text-base  hover:bg-red-700 transition">
              Learn more
            </button>
          </Link>
        </div>

        {/* Right Images (Desktop) */}
        <div className="hidden md:flex  h-[70vh] md:gap-4 lg:col-span-8">
          <div className="w-[100%] md:w-[50%]">
            <Image src={reorderedImages[0] === "/images/legacy/2.png" ? "/images/legacy/11.png" : reorderedImages[0]} alt="legacy main" width={1200} height={400} className="w-full h-[70vh] object-cover rounded" />
          </div>
          {reorderedImages.slice(1).map((img, i) => (
            <div key={i} className="flex-1">
              <Image src={img} alt={`legacy ${i}`} width={300} height={400} className="w-full hidden md:block h-[70vh] object-cover rounded" />
            </div>
          ))}
        </div>
             <div className="flex md:hidden  h-[70vh] md:gap-4 lg:col-span-8">
          <div className="w-[100%] md:w-[50%]">
            <Image src={reorderedImages[0]} alt="legacy main" width={300} height={400} className="w-full h-[70vh] object-contain rounded" />
          </div>
          {reorderedImages.slice(1).map((img, i) => (
            <div key={i} className="flex-1">
              <Image src={img} alt={`legacy ${i}`} width={300} height={400} className="w-full hidden md:block h-[70vh] object-cover rounded" />
            </div>
          ))}
        </div>

        {/* Right Images (Mobile) */}
        <div className="hidden flex-col gap-4 lg:col-span-8">
          {reorderedImages.map((img, i) => (
            <div key={i} className="flex-1">
              <Image src={img} alt={`legacy mobile ${i}`} width={300} height={400} className="w-full h-[50vh] object-cover rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}