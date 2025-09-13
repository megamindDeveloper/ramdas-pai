"use client"; // Add this line for Next.js 13+ App Router

import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

const Architect = () => {
  const textAnimation1 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileIsPlaying, setMobileIsPlaying] = useState(false);
  const text1InView = useInView(textAnimation1, { once: true });
  return (
    <div className="mx-auto container lg:py-20 px-5 lg:px-0 overflow-hidden rounded-3xl lg:max-w-6xl">
     <div className="relative  hidden mb-8 rounded-lg aspect-video bg-black z-10">
  {!mobileIsPlaying ? (
    <>
      {/* Thumbnail overlay with play button */}
      <img
        src="https://img.youtube.com/vi/-Q3BJUyA9OI/maxresdefault.jpg"
        alt="GLC 2024 Thumbnail"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer">
        <button onClick={() => setMobileIsPlaying(true)} className="flex items-center justify-center">
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

      <div className="">
        <p className="text-[#E8590C]  font-helvetica text-2xl lg:text-center mb-5">The Architect of Modern Manipal</p>
        <h2 className="font-helvetica text-black font-bold lg:text-center lg:font-medium leading-none text-3xl  lg:text-[64px]">
          <AnimatedTextCharacter text="Dr. Ramdas M. Pai" />
        </h2>
        <p
          ref={textAnimation1}
          className={`font-helvetica  text-black text-start lg:text-[18px] leading-tight mx-auto lg:text-center max-w-6xl mt-4 ${
            text1InView ? "text-slide-in" : ""
          }`}
        >
          Dr. Ramdas M. Pai, Chancellor of Manipal Academy of Higher Education (MAHE) and recipient of the Padma Bhushan (2011), envisions a future
          where Manipal stands among the world’s premier educational institutions. With his tireless dedication, Dr. Pai’s extraordinary leadership,
          innovative thinking, and visionary approach have shaped generations of learners, thus transforming Manipal into a beacon of global education
          with the noblest of ideals.
        </p>
      </div>
      <div className="relative  mt-8 overflow-hidden rounded-lg lg:rounded-none aspect-video bg-black z-10">
        {!isPlaying ? (
          <>
            {/* Thumbnail overlay with play button */}
            <img src="https://img.youtube.com/vi/-Q3BJUyA9OI/maxresdefault.jpg" alt="GLC 2024 Thumbnail" className="w-full h-full object-cover " />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer">
              <button onClick={() => setIsPlaying(true)} className="flex items-center justify-center">
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
