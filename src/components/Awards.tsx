"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import "swiper/css";

const awardsStatic = [
  { id: 1, title: "Padma Bhushan ", date: "2011", subtitle: "Government of India", src: "/images/awards/1.1.png" },

  { id: 1, title: "Padma Bhushan ", date: "2011", subtitle: "Government of India", src: "/images/awards/1.2.png" },
];

const awards = [
  { id: 1, title: "Padma Bhushan ", date: "2011", subtitle: "Government of India", src: "/images/awards/1.1.png" },

  { id: 1, title: "Datuk Award ", date: "2011", subtitle: "Government of Melaka, Malaysia", src: "/images/awards/1.2.png" },

  {
    id: 2,

    title: "World Konkani Convention Award ",
    date: "1995",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.3.png",
  },

  {
    id: 2,

    title: "Golden Peacock Lifetime Achievement Award ",
    date: "2011",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.4.png",
  },

  { id: 1, title: "Award of Philanthropy ", date: "1992", subtitle: "Bunt’s Sangha, Bombay", src: "/images/awards/2.1.png" },

  {
    id: 1,
    title: "Chanakya Award",
    date: "2002",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/2.2.png",
  },

  {
    id: 2,
    title: "Seva Ratna Prashasti Award ",
    date: "1994",
    subtitle: "Kanakuri Memorial Trust, South Canara",
    src: "/images/awards/2.3.png",
  },
  { id: 2, title: "Suvarna Karnataka Award", subtitle: "Government of Karnataka Honour", src: "/images/awards/2.3.png" },
  { id: 1, title: "Padma Bhushan ", date: "2011", subtitle: "Government of India", src: "/images/awards/1.1.png" },

  { id: 1, title: "Datuk Award ", date: "2011", subtitle: "Government of Melaka, Malaysia", src: "/images/awards/1.2.png" },

  {
    id: 2,

    title: "World Konkani Convention Award ",
    date: "1995",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.3.png",
  },

  {
    id: 2,

    title: "Golden Peacock Lifetime Achievement Award ",
    date: "2011",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.4.png",
  },

  { id: 1, title: "Award of Philanthropy ", date: "1992", subtitle: "Bunt’s Sangha, Bombay", src: "/images/awards/2.1.png" },

  {
    id: 1,
    title: "Chanakya Award",
    date: "2002",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/2.2.png",
  },

  {
    id: 2,
    title: "Seva Ratna Prashasti Award ",
    date: "1994",
    subtitle: "Kanakuri Memorial Trust, South Canara",
    src: "/images/awards/2.3.png",
  },
  { id: 2, title: "Suvarna Karnataka Award ", subtitle: "Government of Karnataka Honour", src: "/images/awards/2.3.png" },
];

const mobImg = [
  {
    id: 1,
    src: "/images/awards/3.png",
    alt: "1",
  },
  {
    id: 2,
    src: "/images/glimpses/73.webp",
    alt: "2",
  },
  {
    id: 3,
    src: "/images/awards/1.png",
    alt: "3",
  },
];

export default function Awards() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

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

  const mobSwiperRef1 = useRef(null);
  const mobSwiperRef2 = useRef(null);

  const isInView1 = useInView(mobSwiperRef1, { once: true, amount: 0.8 });
  const isInView2 = useInView(mobSwiperRef2, { once: true, amount: 0.8 });

  const Card = ({ award }: { award: { title: string; subtitle?: string; src?: string; date?: string; id?: number } }) => (
    <div className="w-full max-w-sm xl:max-w-[95%]">
      <div
        className="p-3 hidden  text-start transition h-[292px] w-full md:flex flex-col bg-cover bg-center "
        style={{ backgroundImage: award.src ? `url(${award.src})` : "linear-gradient(to right, #FF671F, #FF3C00)" }}
      >
        {/* Fixed positioning for title */}
        <div className="md:mt-18">
          <h3
            className={`text-white font-bold text-xl md:text-[24px] leading-snug font-serif min-h-[3.5rem] flex items-start ${
              award.id == 1 ? "w-[150px]" : ""
            }`}
          >
            {award.title}
          </h3>
        </div>

        {/* Flexible space to push content to bottom */}
        <div className=" flex-1"></div>

        {/* Fixed positioning for date and subtitle at bottom */}
        <div className="mb-4">
          {award.date && <p className="text-md text-white/80 font-medium mb-1 font-sans">{award.date}</p>}
          {award.subtitle && <p className="text-md text-white/80 font-medium font-sans leading-tight">{award.subtitle}</p>}
        </div>
      </div>
      <div
        className="p-3 md:hidden  text-start transition h-[292px] justify-evenly w-full flex flex-col bg-cover bg-center "
        style={{ backgroundImage: award.src ? `url(${award.src})` : "linear-gradient(to right, #FF671F, #FF3C00)" }}
      >
        {/* Fixed positioning for title */}
        <div className="md:mt-18">
          <h3
            className={`text-white font-bold text-xl md:text-[24px] leading-snug font-serif min-h-[3.5rem] flex items-start ${
              award.id == 1 ? "w-[150px]" : ""
            }`}
          >
            {award.title}
          </h3>
        </div>

        {/* Flexible space to push content to bottom */}

        {/* Fixed positioning for date and subtitle at bottom */}
        <div className="mb-4">
          {award.date && <p className="text-md text-white/80 font-medium mb-1 font-sans">{award.date}</p>}
          {award.subtitle && <p className="text-md text-white/80 font-medium font-sans leading-tight">{award.subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const StaticCard = ({ award }: { award: { title: string; subtitle?: string; src?: string; date?: string; id?: number } }) => (
    <div className="w-full ">
      <div
        className="px-20 py-10 hidden  text-start transition h-full w-full md:flex flex-col bg-cover bg-center "
        style={{ backgroundImage: award.src ? `url(${award.src})` : "linear-gradient(to right, #FF671F, #FF3C00)" }}
      >
        {/* Fixed positioning for title */}
        <div className="">
          <h3
            className={`text-white font-bold text-xl md:text-[48px] leading-snug font-serif min-h-[3.5rem] flex items-start ${
              award.id == 1 ? "" : ""
            }`}
          >
            {award.title}
          </h3>
        </div>

        {/* Flexible space to push content to bottom */}

        {/* Fixed positioning for date and subtitle at bottom */}
        <div className="mt-8">
          {award.date && <p className="text-2xl text-white/80 font-medium mb-1 font-sans">{award.date}</p>}
          {award.subtitle && (
            <p className="text-2xl text-white/80 font-medium font-sans leading-[1.5]">
              {award.subtitle.includes(" of ") ? (
                <>
                  {award.subtitle.split(" of ")[0]} <br />
                  of {award.subtitle.split(" of ")[1]}
                </>
              ) : (
                award.subtitle
              )}
            </p>
          )}
        </div>
      </div>
      <div
        className="p-3 md:hidden  text-start transition h-[292px] justify-evenly w-full flex flex-col bg-cover bg-center "
        style={{ backgroundImage: award.src ? `url(${award.src})` : "linear-gradient(to right, #FF671F, #FF3C00)" }}
      >
        {/* Fixed positioning for title */}
        <div className="md:mt-18">
          <h3
            className={`text-white font-bold text-xl md:text-[24px] leading-snug font-serif min-h-[3.5rem] flex items-start ${
              award.id == 1 ? "w-[150px]" : ""
            }`}
          >
            {award.title}
          </h3>
        </div>

        {/* Flexible space to push content to bottom */}

        {/* Fixed positioning for date and subtitle at bottom */}
        <div className="mb-4">
          {award.date && <p className="text-md text-white/80 font-medium mb-1 font-sans">{award.date}</p>}
          {award.subtitle && <p className="text-md text-white/80 font-medium font-sans leading-tight">{award.subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="lg:pt-[3rem] relative py-16 md:pt-16 md:pb-0  bg-gradient-to-r from-[#FF953E] via-[#F96E38] to-[#EE4023]  flex flex-col justify-between">
        <div ref={prevRef} className="absolute md:hidden left-1 top-1/2">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.49257 16.0377L0 8.01887L8.49257 0L10 1.42335L3.01486 8.01887L10 14.6144L8.49257 16.0377Z" fill="white" />
          </svg>
        </div>
        <div ref={nextRef} className="absolute md:hidden right-1 top-1/2">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.50743 16.9811L10 8.96223L1.50743 0.943359L0 2.36671L6.98514 8.96223L0 15.5577L1.50743 16.9811Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full text-white">
          {/* Heading aligned left */}
          <h1 className="font-sans lg:pb-[3rem] pb-12  !text-white text-start font-bold tracking-wider leading-[1.2] lg:leading-none text-[34px] lg:text-[44px]">
            Awards and <br /> Accolades
          </h1>
        </div>

        {/* Images row at bottom */}
        <div className="w-full md:flex hidden justify-center items-end ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-6">
            <div className="flex justify-center items-end">
              <Image src="/images/awards/3.png" alt="Award Left" width={400} height={400} className="shadow-lg object-cover h-[400px]" />
            </div>
            <div className="flex justify-center items-end">
              <Image src="/images/glimpses/73.webp" alt="Award Center" width={400} height={400} className="shadow-lg object-cover h-[400px]" />
            </div>
            <div className="flex justify-center items-end">
              <Image src="/images/awards/1.png" alt="Award Right" width={400} height={400} className="shadow-lg object-cover h-[400px]" />
            </div>
          </div>
        </div>

        <div className="md:hidden block px-5">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            onSwiper={setSwiperInstance}
            onInit={(swiper) => {
              // Attach custom navigation
              if (swiper.params.navigation) {
                const navigation = swiper.params.navigation as any;
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            autoplay={{
              delay: 1500, // 3 seconds per slide
              disableOnInteraction: false, // keeps autoplay even after user swipes
            }}
          >
            {mobImg.map((img) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, amount: 0.5 });

              return (
                <SwiperSlide key={img.id}>
                  <motion.div ref={ref} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex justify-center">
                    <Image src={img.src} alt={img.alt} width={400} height={400} className="shadow-lg object-cover h-[400px]" />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {swiperInstance && <CustomBulletPagination swiper={swiperInstance} total={3} />}
        </div>
      </section>

      <div className="mt-8">
        {/* Awards: full rows in grid */}
        {awardsStatic.length > 0 && (
          <div className="grid   grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 max-w-7xl lg:max-w-7xl mx-auto px-4 py-6 justify-items-center">
            {awardsStatic.map((award, i) => (
              <StaticCard key={i} award={award} />
            ))}
          </div>
        )}
        {awards.length > 0 && (
          <div className="px-4 py-6 mx-auto max-w-7xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 1 }, // mobile
                640: { slidesPerView: 2 }, // sm
                768: { slidesPerView: 3 }, // md
                1024: { slidesPerView: 4 }, // lg+
              }}
            >
              {awards.map((award, i) => (
                <SwiperSlide key={i}>
                  <Card award={award} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* <div className="md:hidden block px-4">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2000, disableOnInteraction: false }} loop={true} spaceBetween={16} slidesPerView={1}>
            {awards.map((award, i) => (
              <SwiperSlide key={i}>
                <motion.div ref={mobSwiperRef2} animate={isInView2 ? { opacity: 1, y: 0 } : {}}>
                  <Card award={award} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </div>
    </>
  );
}

const CustomBulletPagination: React.FC<{ swiper: any; total: number }> = ({ swiper, total }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!swiper) return;
    const onSlideChange = () => setActiveIndex(swiper.realIndex);
    swiper.on("slideChange", onSlideChange);
    return () => {
      swiper.off("slideChange", onSlideChange);
    };
  }, [swiper]);

  return (
    <div className="md:hidden flex justify-center gap-2 my-4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => swiper.slideToLoop(index)} // ✅ navigate correctly
          className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? "bg-red-600 scale-125" : "bg-[#ebebeb] scale-100"}`}
        />
      ))}
    </div>
  );
};
