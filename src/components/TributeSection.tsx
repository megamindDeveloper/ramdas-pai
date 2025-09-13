"use client"; // Add this line for Next.js 13+ App Router

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// import required modules
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { useInView } from "framer-motion";

// YouTube video IDs for the top slider
const sliderVideoIds = ["08DCoUv-RQM", "08DCoUv-RQM", "08DCoUv-RQM", "08DCoUv-RQM", "08DCoUv-RQM", "08DCoUv-RQM"];
// YouTube video ID for the main video at the bottom
const mainVideoId = "a-S2EVkP0zM";

const TributeSection = () => {
  const textAnimation1 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileIsPlaying, setMobileIsPlaying] = useState(false);
  const text1InView = useInView(textAnimation1, { once: true });
  return (
    <div className=" py-20 ">
      <div className=" mx-auto">
        {/* Top Video Slider Section */}
      <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Autoplay]}
          className="mySwiper mb-12"
        >
          {sliderVideoIds.map((id) => (
            <SwiperSlide key={id}>
              <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Text Content Section */}
       
      </div>
    </div>
  );
};

export default TributeSection;
