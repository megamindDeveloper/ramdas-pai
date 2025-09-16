"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconArrowRight } from "@tabler/icons-react";
import { useOutsideClick } from "./UseOutsideClick";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";


import Image from "next/image";
import Link from "next/link";

// Framer-motion variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.25 } },
};
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
};
const cardTransitionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

// Define the type for a single reel item
type ReelItem = {
  id: string;
  name: string;
  designation: string;
  thumbnailUrl: string;
  reelsUrl: string;
};

// A dedicated card for Reels to match the data type
const ReelCard = ({ item, onClick, isFeatured = false }: { item: ReelItem; onClick: () => void; isFeatured?: boolean }) => (
  <div className="relative cursor-pointer overflow-hidden group shadow-md " onClick={onClick}>
    <Image
      src={item.thumbnailUrl}
      alt={`Thumbnail for ${item.name}`}
      className="w-full h-full object-cover aspect-[3/4]"
      width={800}
      height={isFeatured ? 1067 : 533}
      loading="lazy"
    />
    <div
      className={`absolute bottom-0 left-0 right-0 text-white transition-colors duration-300 ease-in-out min-h-24 flex flex-col justify-center px-6 ${
        isFeatured ? "bg-[#F37032]" : "bg-[#F37032] md:bg-[#919191] group-hover:bg-[#F37032]"
      }`}
    >
      <p className={`font-bold font-sans leading-tight ${isFeatured ? "text-2xl" : "text-lg"}`}>{item.name}</p>
      <div className={`font-light mt-4 ${isFeatured ? "text-sm" : "text-xs"}`}>
        <span>{item.designation}</span>
      </div>
    </div>
  </div>
);

const ReelCard1 = ({ item, onClick, isFeatured = false }: { item: ReelItem; onClick: () => void; isFeatured?: boolean }) => (
  <div className="relative cursor-pointer overflow-hidden group shadow-md h-[100%]   " onClick={onClick}>
     <Image
        src={item.thumbnailUrl}
        alt={`Portrait of ${item.name}`}
        className="w-full h-full object-cover "
        width={800}
        height={1000}
        loading="lazy"
      />
    <div
      className={`absolute bottom-0 left-0 right-0 text-white transition-colors duration-300 ease-in-out p-6 ${
        isFeatured ? "bg-[#F37032]" : "bg-[#919191] group-hover:bg-[#F37032]"
      }`}
    >
      <p className={`font-bold font-sans leading-tight ${isFeatured ? "text-2xl" : "text-lg"}`}>{item.name}</p>
      <div className={`font-light mt-4 ${isFeatured ? "text-sm" : "text-xs"}`}>
        <span>{item.designation}</span>
      </div>
    </div>
  </div>
);
const InstagramReels: React.FC = () => {


  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const [reels, setReels] = useState<ReelItem[]>([]);
  const [allReels, setAllReels] = useState<ReelItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoModalRef = useRef<HTMLDivElement>(null);
  const viewMoreModalRef = useRef<HTMLDivElement>(null);

  // Fetch latest 3 reels for the main page
  useEffect(() => {
    const colRef = collection(db, "Reels");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(3));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ReelItem));
      setReels(items);
    });
    return () => unsub();
  }, []);

  // Fetch ALL reels for the "View More" modal
  useEffect(() => {
    const colRef = collection(db, "Reels");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ReelItem));
      setAllReels(items);
    });
    return () => unsub();
  }, []);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- THIS IS THE CORRECTED FUNCTION ---
  function getYouTubeEmbedUrl(url: string): string {
    if (!url) return "";
    try {
      // Shorts URL: https://youtube.com/shorts/{videoId}
      const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch && shortsMatch[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`;
      }

      // Watch URL: https://youtube.com/watch?v={videoId}
      const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      if (watchMatch && watchMatch[1]) {
        return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
      }

      // Already an embed URL: https://www.youtube.com/embed/{videoId}
      const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
      if (embedMatch && embedMatch[1]) {
        return url.includes("?") ? url : `${url}?autoplay=1`;
      }

      return url;
    } catch {
      return url;
    }
  }

  // Modal Control Functions
  const openVideoModal = (videoUrl: string) => {
    setCurrentVideoUrl(getYouTubeEmbedUrl(videoUrl));
    setIsVideoModalOpen(true);
  };
  const closeVideoModal = () => setIsVideoModalOpen(false);
  const closeViewMoreModal = () => setIsViewMoreModalOpen(false);

  const handleReelClick = (videoUrl: string) => {
    closeViewMoreModal();
    setTimeout(() => openVideoModal(videoUrl), 200);
  };

  const handleNext = () => {
    if (allReels.length > 1) {
      setActiveIndex((prev) => (prev + 1) % allReels.length);
    }
  };

  // Hooks for closing modals
  useOutsideClick(videoModalRef, closeVideoModal);
  useOutsideClick(viewMoreModalRef, closeViewMoreModal);

  // Effect for Escape key and body overflow
  useEffect(() => {
    const isAnyModalOpen = isVideoModalOpen || isViewMoreModalOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isVideoModalOpen) closeVideoModal();
        if (isViewMoreModalOpen) closeViewMoreModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isVideoModalOpen, isViewMoreModalOpen]);

  // Dynamic data for the "View More" modal
  const featuredReel = allReels[activeIndex];
  const otherReels = allReels.filter((_, index) => index !== activeIndex).slice(0, 5);

  return (
    <div className="relative">
      <div ref={prevRef} className="absolute z-50 md:hidden left-1 top-1/2">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49257 16.0377L0 8.01887L8.49257 0L10 1.42335L3.01486 8.01887L10 14.6144L8.49257 16.0377Z" fill="#EF2700" />
        </svg>
      </div>
      <div ref={nextRef} className="absolute z-50 md:hidden right-1 top-1/2">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.50743 16.9811L10 8.96223L1.50743 0.943359L0 2.36671L6.98514 8.96223L0 15.5577L1.50743 16.9811Z" fill="#EF2700" />
        </svg>
      </div>
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <h2 className="font-helvetica font-medium leading-[1.2] lg:leading-none text-[34px] lg:text-[44px]">
        <AnimatedTextCharacter className="text-black font-sans font-semibold" text="Wishes from" />
        <AnimatedTextCharacter className="text-[#EF4123] font-serif mb-1 font-normal" text="MAHE Leadership" />
      </h2>

      {/* Main page display */}
      {isMobile ? (
        <>
         <Swiper
                       modules={[Navigation, Pagination,Autoplay]}
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
    delay: 1500,      // 3 seconds per slide
    disableOnInteraction: false, // keeps autoplay even after user swipes
  }}
          className="mt-8 !pb-5"
        >
          {allReels.map((item) => (
            <SwiperSlide key={item.id}>
              <ReelCard item={item} onClick={() => openVideoModal(item.reelsUrl)} />
            </SwiperSlide>
          ))}
        </Swiper>
        {swiperInstance && <CustomBulletPagination swiper={swiperInstance} total={allReels.length} />}
        </>
      ) : (
       
       <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={20}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  loop={true}

  className="mt-8 lg:mt-12 !pb-10"
>
  {allReels.map((item) => (
    <SwiperSlide key={item.id}>
      <ReelCard item={item} onClick={() => openVideoModal(item.reelsUrl)} />
    </SwiperSlide>
  ))}
</Swiper>

      )}

<div className="md:flex hidden  mt-10">
        {/* Reset activeIndex to 0 when opening the modal */}
        <button
          onClick={() => {
            setIsViewMoreModalOpen(true);
            setActiveIndex(0);
          }}
          className="uppercase cursor-pointer border-[2px] bg-[#EF2700] text-white px-8 py-3 font-helvetica font-bold text-[16px]"
        >
          View more
        </button>
      </div>

     

      {/* "View More" Modal */}
      <AnimatePresence>
        {isViewMoreModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-auto p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80 backdrop-blur-lg" onClick={closeViewMoreModal} />
            <motion.div
              ref={viewMoreModalRef}
              variants={modalVariants}
              className="relative w-full max-w-4xl h-[90vh] bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="font-helvetica  font-medium leading-none text-[32px]  lg:text-[44px]">
                  <AnimatedTextCharacter className="text-black font-sans font-semibold lg:text-[47px]" text="Wishes from" />
                  <AnimatedTextCharacter className="text-[#EF4123] font-serif mt-1 font-normal" text="MAHE Leadership" />
                </h2>
                <motion.button
                  className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={closeViewMoreModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconX className="text-white w-5 h-5" />
                </motion.button>
              </div>

              <motion.div variants={contentVariants} className="flex-grow overflow-hidden">
                <div className="grid grid-cols-12 grid-rows-3 gap-4 h-full">
                  {/* Left Side: Featured Minister with Animation */}
                  <div className="col-span-12 md:col-span-6 row-span-3">
                    {/* --- CHANGE 5: AnimatePresence for smooth transitions --- */}
                    <AnimatePresence mode="wait">
                      {featuredReel && (
                        <motion.div
                          key={activeIndex} // Key change triggers animation
                          variants={cardTransitionVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="w-full h-full"
                        >
                          <ReelCard1 item={featuredReel} onClick={() => handleReelClick(featuredReel.reelsUrl)} isFeatured={true} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Side: Other Ministers & Next Button */}
                  <div className="hidden md:grid col-span-6 row-span-3 grid-cols-2 grid-rows-3 gap-4">
                    {otherReels.map((item) => (
                      <div key={item.id} className="cursor-pointer group overflow-hidden  shadow-md" onClick={() => handleReelClick(item.reelsUrl)}>
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.name}
                          width={400}
                          height={533}
                          className="w-full h-full object-cover object-top "
                        />
                      </div>
                    ))}
                    {/* --- CHANGE 6: The "Next" Button in the last grid slot --- */}
                    {allReels.length > 1 && (
                      <div className="flex items-center justify-center  ">
                        <button
                          onClick={handleNext}
                          className="flex flex-col cursor-pointer pl-4 justify-end w-full h-full transition-colors duration-300 "
                          aria-label="Next Minister"
                        >
                          <svg width="32" height="56" viewBox="0 0 32 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M4.82378 -4.68472e-07L32 28L4.82378 56L-3.20993e-06 51.03L22.3524 28L8.16768e-07 4.97L4.82378 -4.68472e-07Z"
                              fill="#EF2700"
                            />
                          </svg>

                          {/* <span className="mt-2 font-semibold">NEXT</span> */}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {isVideoModalOpen && currentVideoUrl && (
          <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" initial="hidden" animate="visible" exit="exit">
            <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80" onClick={closeVideoModal} />
            <motion.div
              ref={videoModalRef}
              variants={modalVariants}
              className="relative w-full max-w-lg bg-black rounded-2xl shadow-2xl overflow-hidden"
            >
              <motion.button
                variants={contentVariants}
                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-gray-800/60 flex items-center justify-center"
                onClick={closeVideoModal}
              >
                <IconX className="text-white w-5 h-5" />
              </motion.button>
              <div className="aspect-[9/16]">
                <iframe
                  className="w-full h-full"
                  src={currentVideoUrl}
                  title="YouTube Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default InstagramReels;
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