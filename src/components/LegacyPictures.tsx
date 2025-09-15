
"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import Link from "next/link";
import { Navigation, Autoplay } from "swiper/modules";

// ------------------ Dummy Data -------------------
// const speakerData = [
//   {
//     name: "Golden Peacock Lifetime Achievement Award (2011)",

//     description: "",
//     imageWhite: "/images/legacyImages/Mask group (5).png",
//     blank: false,
//   },
//   {
//     name: "Padma Bhushan (2011)",
//     description: "Government of India",

//     imageWhite: "/images/legacyImages/Mask group (6).png",
//     blank: false,
//   },
//   {
//     name: "Dato’s Award (2011)",
//     description: "Government of Melaka, Malaysia",

//     imageWhite: "/images/legacyImages/Mask group (7).png",
//     blank: false,
//   },
//   {
//     name: "World Konkani Convention Award (1995)",

//     description: "",
//     imageWhite: "/images/legacyImages/Mask group (5).png",
//     blank: false,
//   },
//   {
//     name: "Award of Philanthropy (1992)",
//     description: "Bunt’s Sangha, Bombay",

//     imageWhite: "/images/legacyImages/Mask group (6).png",
//     blank: false,
//   },
//   {
//     name: "Seva Ratna Prashasti Award (1994)",

//     description: "Kanakuri Memorial Trust, South Canara",
//     imageWhite: "/images/legacyImages/Mask group (7).png",
//     blank: false,
//   },
//   {
//     name: "Suvarna Karnataka Award (2004)",
//     description: "Government of Karnataka Honour",

//     imageWhite: "/images/legacyImages/Mask group (5).png",
//     blank: false,
//   },
//   {
//     name: "Chanakya Award (2002)",
//     description: "ational Awards for Achievers, Public Relations Council of India",

//     imageWhite: "/images/legacyImages/Mask group (6).png",
//     blank: false,
//   },


// ];

const images = [
  "/images/legacyImages/Mask group (5).png",
  "/images/legacyImages/Mask group (6).png",
  "/images/legacyImages/Mask group (7).png",

  "/images/glimpses/1.jpg",
  "/images/glimpses/2.jpg",
  "/images/glimpses/3.jpg",
  "/images/glimpses/4.jpg",
  "/images/glimpses/5.jpg",
  "/images/glimpses/6.jpg",
  "/images/glimpses/7.jpg",
  "/images/glimpses/8.jpg",
  "/images/glimpses/9.jpg",
  "/images/glimpses/10.jpg",
  "/images/glimpses/11.jpg",
  "/images/glimpses/12.jpg",
  "/images/glimpses/13.jpg",
  "/images/glimpses/14.jpg",
  "/images/glimpses/15.jpg",
  "/images/glimpses/16.jpg",
  "/images/glimpses/17.jpg",
  "/images/glimpses/18.jpg",
  "/images/glimpses/19.jpg",
  "/images/glimpses/20.jpg",
  "/images/glimpses/21.jpg",
  "/images/glimpses/22.jpg",
  "/images/glimpses/23.jpg",
  "/images/glimpses/24.jpg",
  "/images/glimpses/25.jpg",
  "/images/glimpses/26.jpg",
  "/images/glimpses/27.jpg",
  "/images/glimpses/28.jpg",
  "/images/glimpses/29.jpg",
  "/images/glimpses/30.jpg",
  "/images/glimpses/31.jpg",
  "/images/glimpses/32.jpg",
  "/images/glimpses/33.jpg",
  "/images/glimpses/34.jpg",
  "/images/glimpses/35.jpg",
  "/images/glimpses/36.jpg",
  "/images/glimpses/37.jpg",
  "/images/glimpses/38.jpg",
  "/images/glimpses/39.jpg",
  "/images/glimpses/40.jpg",
  "/images/glimpses/41.jpg",
  "/images/glimpses/42.jpg",
  "/images/glimpses/43.jpg",
  "/images/glimpses/44.jpg",
  "/images/glimpses/45.jpg",
  "/images/glimpses/46.jpg",
  "/images/glimpses/47.jpg",
  "/images/glimpses/48.jpg",
  "/images/glimpses/49.jpg",
  "/images/glimpses/50.jpg",
  "/images/glimpses/51.jpg",
  "/images/glimpses/52.jpg",
  "/images/glimpses/53.jpg",
  "/images/glimpses/54.jpg",
  "/images/glimpses/55.jpg",
  "/images/glimpses/56.jpg",
  "/images/glimpses/57.jpg",
  "/images/glimpses/58.jpg",
  "/images/glimpses/59.jpg",
  "/images/glimpses/60.jpg",
  "/images/glimpses/61.jpg",
  "/images/glimpses/62.jpg",
  "/images/glimpses/63.jpg",
  "/images/glimpses/64.jpg",
  "/images/glimpses/65.jpg",
  "/images/glimpses/66.jpg",
  "/images/glimpses/67.jpg",
  "/images/glimpses/68.jpg",
  "/images/glimpses/69.jpg",
  "/images/glimpses/70.jpg",
  "/images/glimpses/71.jpg",
  "/images/glimpses/72.jpg",
  "/images/glimpses/73.jpg",
  "/images/glimpses/74.jpg",
  "/images/glimpses/75.jpg",
  "/images/glimpses/76.jpg",
  "/images/glimpses/77.jpg",
  "/images/glimpses/78.jpg",
  "/images/glimpses/79.jpg",
  "/images/glimpses/80.jpg",
  "/images/glimpses/81.jpg",
  "/images/glimpses/82.jpg",
  "/images/glimpses/83.jpg",
  "/images/glimpses/84.jpg",
  "/images/glimpses/85.jpg",
  "/images/glimpses/86.png",
  "/images/glimpses/87.jpg",
  "/images/glimpses/88.jpg",
  "/images/glimpses/89.jpg",
  "/images/glimpses/90.jpg",
];

const speakerData = images.map((img, index) => ({
  name: `Glimpse ${index + 1}`,
  description: "",
  imageWhite: img,
  blank: false,
}));
// -------------------------------------------------

const LegacyPictures = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSpeakers, setShowSpeakers] = useState(
    speakerData.slice(0, 3) // show only few in mobile initially
  );

  return (
    <section className="relative" >
      <div className=" relative lg:py-28 px-5 lg:px-10 lg:max-w-6xl mx-auto xl:max-w-[70%]">
        <h2 className="font-helvetica text-center font-medium leading-none text-[32px] lg:text-[64px]">
          <AnimatedTextCharacter text="A Legacy in Pictures" />
        </h2>

        {/* Swiper for Desktop */}
        <div className="mt-8 lg:mt-12 relative ">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper?.realIndex)}
            onSwiper={setSwiper}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3000, // 3 seconds per slide
              disableOnInteraction: false, // keeps autoplay running even after user interaction
            }}
            className="mySwipers"
          >
            {speakerData.map((speaker, index) => (
              <SwiperSlide key={"speaker" + index}>
                <SpeakerCard {...speaker} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Grid */}
        {/* <div className="hidden mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {showSpeakers
          .filter((item) => !item?.blank)
          .map((speaker, index) => (
            <SpeakerCard key={index + "speaker"} {...speaker} />
          ))}
      </div> */}

        <button
          onClick={() => {
            setShowSpeakers(speakerData.filter((item) => !item?.blank));
          }}
          className={`${speakerData.length === showSpeakers.length ? "hidden" : "block"
            } uppercase hidden cursor-pointer border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold mt-8 mx-auto`}
        >
          View more
        </button>
      </div>
      <div
        className="absolute  -right-0 xl:-right-0 bg-[#E85B25] p-4  2xl:-right-0 top-1/2 z-50 -translate-y-1/2 cursor-pointer hidden lg:block"
        onClick={() => {
          swiper.slideNext();
        }}
      >

        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_10_638" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="29">
            <rect x="28.8091" y="28.5728" width="28" height="28" transform="rotate(-180 28.8091 28.5728)" fill="#EC2188" />
          </mask>
          <g mask="url(#mask0_10_638)">
            <path d="M10.1424 2.90592L21.8091 14.5726L10.1424 26.2393L8.07158 24.1684L17.6674 14.5726L8.07158 4.97675L10.1424 2.90592Z" fill="white" />
          </g>
        </svg>

      </div>
      <div
        onClick={() => {
          swiper.slidePrev();
        }}
        className="absolute  -left-0 xl:-left-0 2xl:-left-0 bg-[#E85B25]   p-4  top-1/2 z-50 -translate-y-1/2 cursor-pointer hidden lg:block"
      >
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_10_633" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="29">
            <rect y="0.572754" width="28" height="28" fill="#EC2188" />
          </mask>
          <g mask="url(#mask0_10_633)">
            <path d="M18.6667 26.2396L7.00006 14.5729L18.6667 2.90625L20.7376 4.97708L11.1417 14.5729L20.7376 24.1688L18.6667 26.2396Z" fill="white" />
          </g>
        </svg>

      </div>

      <div className="flex justify-center ">
        <Link href="/glimpses-of-dr">
          <button className="uppercase cursor-pointer border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">
            View more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LegacyPictures;

// ------------------ SpeakerCard -------------------
function SpeakerCard({
  imageWhite,
  name,
  description,
  blank,
  lineBreak = 0,
  role,
}: {
  imageWhite?: string;
  name: string;
  description: string;
  blank?: boolean;
  lineBreak?: number;
  role?: string;
}) {
  return (<>


    <div className="h-full z-50 mx-auto  w-[70%] lg:w-full lg:hover:bg-white fade-in overflow-hidden">
      <div className={`${blank && "bg-white"} mx-auto group w-full h-[15.25rem] lg:h-[25.75rem] lg:hover:bg-white relative z-50`}>
        {!blank && (
          <>
            {/* Mobile Image */}
            <img
              src={imageWhite}
              alt="speaker"
              className="object-cover w-full h-full absolute top-0 left-0 sm:object-contain lg:hidden object-top bg-white"
              loading="lazy"
            />

            {/* Desktop Images */}

            {imageWhite && (
              <img
                src={imageWhite}
                alt="speaker white"
                className="object-cover w-full h-full absolute top-0 left-0 sm:object-contain lg:object-cover object-top transition-opacity duration-500 ease-in-out  hidden lg:block "
                loading="lazy"
              />
            )}
          </>
        )}
      </div>


      {/* <div className="lg:h-full min-h-[8rem] flex flex-col  text-center lg:min-h-[12.25rem] w-full p-2 lg:p-3">
        <h4 className="font-helvetica font-bold lg:text-2xl xl:text-3xl text-[#282828] mt-3">{name}</h4>
        <div className="mt-1">
          <p className="font-helvetica text-center text-xs lg:text-lg">{description}</p>
        </div>
        
      </div> */}

    </div>




  </>




  );
}
