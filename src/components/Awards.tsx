"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import "swiper/css";

const awards = [
  { id:1, title: "Padma Bhushan ", date: "2011", subtitle: "Government of India", src: "/images/awards/1.1.png" },

  { id:1, title: "Datuk Award ", date: "2011", subtitle: "Government of Melaka, Malaysia", src: "/images/awards/1.2.png" },

  {
    id:2,

    title: "World Konkani Convention Award ",
    date: "1995",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.3.png"
  },

  {
    id:2,

    title: "Golden Peacock Lifetime Achievement Award ",
    date: "2011",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/1.4.png"
  },


  { id:1, title: "Award of Philanthropy ", date: "1992", subtitle: "Bunt’s Sangha, Bombay", src: "/images/awards/2.1.png" },

  {
    id:1,
    title: "Chanakya Award",
    date: "2002",
    subtitle: "National Awards for Achievers, Public Relations Council of India",
    src: "/images/awards/2.2.png"
  },

  {
    id:2,
    title: "Seva Ratna Prashasti Award (1994)",
    date: "1994",
    subtitle: "Kanakuri Memorial Trust, South Canara",
    src: "/images/awards/2.3.png"
  },
  { id:2, title: "Suvarna Karnataka Award (2004)", subtitle: "Government of Karnataka Honour", src: "/images/awards/2.3.png" },


];

const mobImg = [
  {
    id: 1,
    src: "/images/awards/1.png",
    alt: "1"
  },
  {
    id: 2,
    src: "/images/glimpses/73.webp",
    alt: "2"
  },
  {
    id: 3,
    src: "/images/awards/3.png",
    alt: "3"
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

  const mobSwiperRef1 = useRef(null);
  const mobSwiperRef2 = useRef(null);


  const isInView1 = useInView(mobSwiperRef1, { once: true, amount: 0.8 });
  const isInView2 = useInView(mobSwiperRef2, { once: true, amount: 0.8 });


  const Card = ({ award }: { award: { title: string; subtitle?: string; src?: string; date?: string; id?:number } }) => (
    <div className="w-full max-w-sm xl:max-w-[95%]">
      <div
        className="p-3 text-start transition h-[292px] w-full flex flex-col bg-cover bg-center "
        style={{ backgroundImage: award.src ? `url(${award.src})` : "linear-gradient(to right, #FF671F, #FF3C00)" }}
      >
        {/* Fixed positioning for title */}
        <div className="mt-18">
          <h3 className={`text-white font-bold text-xl md:text-[24px] leading-snug font-serif min-h-[3.5rem] flex items-start ${award.id==1 ? "w-[150px]" : ""}`}>
            {award.title}
          </h3>
        </div>
        
        {/* Flexible space to push content to bottom */}
        <div className="flex-1"></div>
        
        {/* Fixed positioning for date and subtitle at bottom */}
        <div className="mb-4">
          {award.date && (
            <p className="text-md text-white/80 font-medium mb-1 font-sans">{award.date}</p>
          )}
          {award.subtitle && (
            <p className="text-md text-white/80 font-medium font-sans leading-tight">{award.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );




  return (
    <>
      <section className="lg:pt-[7rem] pt-16  bg-gradient-to-r from-[#FF953E] via-[#F96E38] to-[#EE4023] h-[90vh] flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-6 w-full text-white">
          {/* Heading aligned left */}
          <h1 className="font-sans  !text-white text-start font-bold tracking-wider leading-none text-[32px] lg:text-[44px]">
           Awards and <br /> Accolades
          </h1>
        </div>

        {/* Images row at bottom */}
        <div className="w-full md:flex hidden justify-center items-end ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-6">
            <div className="flex justify-center items-end">
              <Image
                src="/images/awards/1.png"
                alt="Award Left"
                width={400}
                height={400}
                className="shadow-lg object-cover h-[400px]"
              />
            </div>
            <div className="flex justify-center items-end">
              <Image
                src="/images/glimpses/73.webp"
                alt="Award Center"
                width={400}
                height={400}
                className="shadow-lg object-cover h-[400px]"
              />
            </div>
            <div className="flex justify-center items-end">
              <Image
                src="/images/awards/3.png"
                alt="Award Right"
                width={400}
                height={400}
                className="shadow-lg object-cover h-[400px]"
              />
            </div>

          </div>
        </div>

        <div className="md:hidden block px-4" >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
          >
            {mobImg.map((img) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, amount: 0.5 });

              return (
                <SwiperSlide key={img.id}>
                  <motion.div
                    ref={ref}
                 
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                  
                    className="flex justify-center"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={400}
                      className="shadow-lg object-cover h-[400px]"
                    />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>


      <div className="mt-8">
        {/* Awards: full rows in grid */}
        {awards.length > 0 && (
          <div className="md:grid  hidden  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl xl:max-w-[95%] px-4 py-6 mx-auto justify-items-center"
          >

            {awards.map((award, i) => (
              <Card key={i} award={award} />
            ))}

          </div>
        )}

        <div className="md:hidden block px-4" >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
          >
            {awards.map((award, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  ref={mobSwiperRef2}

                  animate={isInView2 ? { opacity: 1, y: 0 } : {}}

                >
                  <Card award={award} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </>
  );
}
