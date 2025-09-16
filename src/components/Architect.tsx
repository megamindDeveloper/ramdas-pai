"use client"; // Add this line for Next.js 13+ App Router

import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import Image from "next/image";

const Architect = () => {
  const textAnimation1 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileIsPlaying, setMobileIsPlaying] = useState(false);
  const text1InView = useInView(textAnimation1, { once: true });
  return (
    <div className="mx-auto container pt-12 lg:py-16 px-5 lg:px-0 overflow-hidden rounded-3xl lg:max-w-7xl">
      <div className="relative  hidden mb-8 rounded-lg aspect-video bg-black z-10 cursor-pointer">
        {!mobileIsPlaying ? (
          <>
            {/* Thumbnail overlay with play button */}
            <Image
              loading="lazy"
              width={1000}
              height={1000}
              src="https://img.youtube.com/vi/-Q3BJUyA9OI/maxresdefault.jpg"
              alt="GLC 2024 Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer">
              <button onClick={() => setMobileIsPlaying(true)} className="flex items-center justify-center cursor-pointer">
                <svg
                  className="h-10 w-10 lg:w-[80px] lg:h-[80px]"
                  width="104"
                  height="104"
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.4">
                    <path
                      d="M51.8506 0.875C23.4079 0.875 0.350586 23.9324 0.350586 52.375C0.350586 80.8177 23.4079 103.875 51.8506 103.875C80.2933 103.875 103.351 80.8177 103.351 52.375C103.32 23.9451 80.2808 0.905391 51.8506 0.875ZM73.5393 54.0159C73.1828 54.7311 72.6032 55.3109 71.8878 55.6674V55.6857L42.4592 70.4001C40.6418 71.3082 38.4325 70.5713 37.5242 68.7538C37.266 68.2372 37.133 67.6668 37.1362 67.0894V37.6609C37.1354 35.6292 38.7814 33.9816 40.8131 33.9805C41.3845 33.9803 41.9482 34.113 42.4592 34.3685L71.8878 49.0828C73.7061 49.989 74.4456 52.1976 73.5393 54.0159Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <iframe
            className="w-full h-full cursor-pointer"
            src="https://www.youtube.com/embed/-Q3BJUyA9OI?autoplay=1&rel=0"
            title="GLC 2024 Experience"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="">
        <h2 className="font-helvetica text-black   font-medium leading-[1.2] lg:leading-none text-[34px]  lg:text-[44px]">
          <AnimatedTextCharacter text="The Architect of Modern Manipal" className="font-sans hidden md:block" />
          <AnimatedTextCharacter text="The Architect of" className="font-sans md:hidden" />
          <AnimatedTextCharacter text="Modern Manipal" className="font-sans md:hidden" />
        </h2>
        <h2 className="font-helvetica text-black  tfont-medium leading-none text-[34px]  lg:text-[44px] my-4">
          <AnimatedTextCharacter text="Dr. Ramdas M. Pai" className="text-[#EF4123] font-serif" />
        </h2>
        <p
          ref={textAnimation1}
          className={`font-sans  text-lg  text-black  lg:text-[18px]  mx-auto text- max-w-7xl mt-4 ${text1InView ? "text-slide-in" : ""}`}
        >
          Dr. Ramdas M. Pai, Chancellor of Manipal Academy of Higher Education (MAHE) and recipient of the Padma Bhushan (2011), envisions a future
          where Manipal stands among the world’s premier educational institutions. With his tireless dedication, Dr. Pai’s extraordinary leadership,
          innovative thinking, and visionary approach have shaped generations of learners, thus transforming Manipal into a beacon of global education
          with the noblest of ideals.
        </p>
      </div>
      <div className="relative  mt-8 overflow-hidden aspect-video bg-black z-10">
        {!isPlaying ? (
          <>
            {/* Thumbnail overlay with play button */}
            <Image
              loading="lazy"
              width={1000}
              height={1000}
              src="https://img.youtube.com/vi/-Q3BJUyA9OI/maxresdefault.jpg"
              alt="GLC 2024 Thumbnail"
              className="w-full h-full object-cover "
            />
            <div onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <button onClick={() => setIsPlaying(true)} className="flex items-center justify-center cursor-pointer">
                <svg
                  className="h-10 w-10 lg:w-[80px] lg:h-[80px]"
                  width="104"
                  height="104"
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.4">
                    <path
                      d="M51.8506 0.875C23.4079 0.875 0.350586 23.9324 0.350586 52.375C0.350586 80.8177 23.4079 103.875 51.8506 103.875C80.2933 103.875 103.351 80.8177 103.351 52.375C103.32 23.9451 80.2808 0.905391 51.8506 0.875ZM73.5393 54.0159C73.1828 54.7311 72.6032 55.3109 71.8878 55.6674V55.6857L42.4592 70.4001C40.6418 71.3082 38.4325 70.5713 37.5242 68.7538C37.266 68.2372 37.133 67.6668 37.1362 67.0894V37.6609C37.1354 35.6292 38.7814 33.9816 40.8131 33.9805C41.3845 33.9803 41.9482 34.113 42.4592 34.3685L71.8878 49.0828C73.7061 49.989 74.4456 52.1976 73.5393 54.0159Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <iframe
            className="w-full h-full "
            src="https://www.youtube.com/embed/-Q3BJUyA9OI?autoplay=1&rel=0"
            title="GLC 2024 Experience"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Architect;
