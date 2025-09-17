"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import BirthdayGreetingCard from "./InitialPopup";

function Book() {
  const [open, setOpen] = useState(false);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [modaLopen, setmodaLopen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      <div className="relative">
        <section className="mx-auto lg:max-w-7xl pt-10 md:pb-8 ">
          <h2
            style={{ color: "#EF4123" }}
            className="text-[32px] px-5 lg:px-0 leading-[1.1] font-sans sm:text-3xl md:text-3xl lg:text-[44px] font-semibold text-[#FF2400] mb-6 md:mb-8"
          >
            A Journey of <br /> Vision & Leadership
          </h2>
          <p className="text-lg text-black font-sans lg:max-w-xl px-5 lg:px-0 mx-auto md:mx-0">
            This flipbook honours Dr. Ramdas M Pai and his invaluable contributions, highlighting remarkable milestones through archival photographs
            and heartfelt reflections that showcase his passion, vision, and dedication to building the modern Manipal.
          </p>
          <div className="hidden md:block relative">
            <div className="flex relative flex-col lg:flex-row gap-6 mt-12">
              <div className="w-[100%] ">
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/3.png"
                  alt="Book Cover 1"
                  className="  object-cover w-[80%] h-[90vh] shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div>
              {/* <div>
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/4.png"
                  alt="Book Cover 2"
                  className="w-full h-full object-cover shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div> */}
            </div>
          </div>
          <div className="my-12  px-5 relative md:hidden">
            <Image
              src="/images/flipImage/3.png"
              alt="Book Cover 1"
              width={1000}
              height={1000}
              className="w-full h-[40vh] lg:h-[500px] object-cover shadow-xl cursor-pointer rounded-lg"
              onClick={() => setOpen(true)}
            />
            {/* <div ref={prevRef} className="absolute md:hidden left-1 top-1/2">
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49257 16.0377L0 8.01887L8.49257 0L10 1.42335L3.01486 8.01887L10 14.6144L8.49257 16.0377Z" fill="#EF2700" />
              </svg>
            </div>
            <div ref={nextRef} className="absolute md:hidden right-1 top-1/2">
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.50743 16.9811L10 8.96223L1.50743 0.943359L0 2.36671L6.98514 8.96223L0 15.5577L1.50743 16.9811Z" fill="#EF2700" />
              </svg>
            </div>
            <div className="px-5 lg:px-0">
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
                className="w-full"
              >
                <SwiperSlide>
                  <Image
                    src="/images/flipImage/3.png"
                    alt="Book Cover 1"
                    width={1000}
                    height={1000}
                    className="w-full h-[40vh] lg:h-[500px] object-cover shadow-xl cursor-pointer rounded-lg"
                    onClick={() => setOpen(true)}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src="/images/flipImage/4.png"
                    alt="Book Cover 2"
                    width={1000}
                    height={1000}
                    className="w-full h-[40vh] lg:h-[500px] object-cover shadow-xl cursor-pointer rounded-lg"
                    onClick={() => setOpen(true)}
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {swiperInstance && <CustomBulletPagination swiper={swiperInstance} total={2} />}
            <div className="absolute hidden lg:block -z-10 -bottom-20 -right-[400px] xl:-right-[300px]">
              <Image
                src="/images/flipImage/6.png"
                alt="Overlay"
                width={1000}
                height={1000}
                className="object-cover  cursor-pointer  "
                onClick={() => setOpen(true)}
              />
            </div> */}
          </div>
        </section>
      </div>
      <div className="flex justify-center mb-16 mt-8">
        <button
          onClick={() => setmodaLopen(true)}
          className="uppercase cursor-pointer border-2 text-[#EF2700] border-[#EF2700] px-8 py-3 font-helvetica font-bold bg-white"
        >
          Wish him happy birthday
        </button>
      </div>
      <AnimatePresence>
       
          <>
              {/* ✅ Load the Greeting Card */}
              <BirthdayGreetingCard showPopup={modaLopen} onClose={() => setmodaLopen(false)} />
                </>
      
   
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl  shadow-2xl w-[90vw] h-[90vh] max-w-[1200px] max-h-[800px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Close Button */}
              <button onClick={() => setOpen(false)} className="absolute cursor-pointer top-4 right-4 text-white bg-black p-2 rounded-full ">
                <IconX size={25} />
              </button>

              {/* Heyzine Flipbook Embed */}
              <iframe src="https://heyzine.com/flip-book/fc13ba6b09.html" className="w-full h-full rounded-lg" frameBorder="0" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Book;

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
