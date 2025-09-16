"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// (Framer-motion variants remain the same)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const cardTransitionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
};
const modalVariants = {
  hidden: { scale: 0.95, opacity: 0, y: 50 },
  visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { scale: 0.95, opacity: 0, y: 50, transition: { duration: 0.2, ease: "easeIn" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } },
  exit: { opacity: 0, y: 20 },
};

type GreetingItem = {
  id: string;
  coverImageUrl: string;
  greetingsImageUrl: string;
  position: string;
  name: string;
};

// This is the new, reusable card component
const MinisterCard = ({ item, onClick }: { item: GreetingItem; onClick: () => void }) => {
  const positionWords = item.position.split(" ");
  const wordsOnFirstLine = 2;

  const requiresSplitting = positionWords.length > wordsOnFirstLine;

  const line1 = requiresSplitting ? positionWords.slice(0, wordsOnFirstLine).join(" ") : item.position;

  const line2 = requiresSplitting ? positionWords.slice(wordsOnFirstLine).join(" ") : null;

  return (
    <div className="relative cursor-pointer overflow-hidden group shadow-md" onClick={onClick}>
      <Image
        src={item.coverImageUrl}
        alt={`Portrait of ${item.name}`}
        className="w-full h-full object-cover aspect-[2.8/4]"
        width={800}
        height={1067}
        loading="lazy"
      />
      {/* --- THIS IS THE MODIFIED LINE --- */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6  text-white 
                   group-hover:bg-[#F37032] bg-[#F37032] md:bg-[#919191] transition-colors duration-300 ease-in-out"
      >
        <p className="font-bold font-sans text-2xl leading-tight">{item.name}</p>

        <div className="text-sm font-light mt-4">
          <span>{line1}</span>
          {line2 && (
            <>
              <br />
              <span>{line2}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const MinisterCardModel = ({ item, onClick }: { item: GreetingItem; onClick: () => void }) => {
  const positionWords = item.position.split(" ");
  const wordsOnFirstLine = 2;

  const requiresSplitting = positionWords.length > wordsOnFirstLine;

  const line1 = requiresSplitting ? positionWords.slice(0, wordsOnFirstLine).join(" ") : item.position;

  const line2 = requiresSplitting ? positionWords.slice(wordsOnFirstLine).join(" ") : null;

  return (
    <div
      className="relative cursor-pointer overflow-hidden group h-[100%]  shadow-md" // Added rounded-lg and shadow-md for card appearance
      onClick={onClick}
    >
      <Image
        src={item.coverImageUrl}
        alt={`Portrait of ${item.name}`}
        className="w-full h-full object-cover aspect-[2.8/4]"
        width={800}
        height={1067}
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#F37032]  text-white ">
        <p className="font-bold font-sans text-2xl  leading-tight">{item.name}</p>

        {/* Display the position text */}
        <div className="text-sm font-light mt-4">
          <span>{line1}</span>
          {/* Only show the second line if it exists */}
          {line2 && (
            <>
              <br />
              <span>{line2}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SecondGreetingsSection: React.FC = () => {



  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const [greetings, setGreetings] = useState<GreetingItem[]>([]);
  const [allGreetings, setAllGreetings] = useState<GreetingItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const singleImageModalRef = useRef<HTMLDivElement>(null);
  const viewMoreModalRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (allGreetings.length > 1) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % allGreetings.length);
    }
  };
  // Fetch LIMITED (3) greetings for the main page
  useEffect(() => {
    const colRef = collection(db, "Greetings");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(3));

    const unsub = onSnapshot(q, (snapshot) => {
      const items: GreetingItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          coverImageUrl: data.coverImageUrl || "",
          greetingsImageUrl: data.greetingsImageUrl || "",
          name: data.name || "",
          position: data.position || "",
        };
      });
      setGreetings(items);
    });

    return () => unsub();
  }, []);

  // Fetch ALL greetings for the modal
  useEffect(() => {
    const colRef = collection(db, "Greetings");
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const items: GreetingItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          coverImageUrl: data.coverImageUrl || "",
          greetingsImageUrl: data.greetingsImageUrl || "",
          name: data.name || "",
          position: data.position || "",
        };
      });
      setAllGreetings(items);
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

  // Functions for single image modal
  const openModal = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageUrl(null);
  };

  const closeViewMoreModal = () => setIsViewMoreModalOpen(false);

  const handleGreetingClick = (imageUrl: string) => {
    closeViewMoreModal();
    openModal(imageUrl);
  };

  useOutsideClick(singleImageModalRef, () => {
    if (isModalOpen) closeModal();
  });
  useOutsideClick(viewMoreModalRef, () => {
    if (isViewMoreModalOpen) closeViewMoreModal();
  });

  useEffect(() => {
    const isAnyModalOpen = isModalOpen || isViewMoreModalOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) {
          closeModal();
        } else if (isViewMoreModalOpen) {
          closeViewMoreModal();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, isViewMoreModalOpen]);

  const featuredMinister = allGreetings[activeIndex];
  // The small cards show everyone *except* the featured one, limited to 5
  const otherMinisters = allGreetings.filter((_, index) => index !== activeIndex).slice(0, 5);
  return (
    <div className="relative">
      <div ref={prevRef} className="absolute md:hidden left-1 top-1/2">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49257 16.0377L0 8.01887L8.49257 0L10 1.42335L3.01486 8.01887L10 14.6144L8.49257 16.0377Z" fill="#EF2700" />
        </svg>
      </div>
      <div ref={nextRef} className="absolute md:hidden right-1 top-1/2">
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.50743 16.9811L10 8.96223L1.50743 0.943359L0 2.36671L6.98514 8.96223L0 15.5577L1.50743 16.9811Z" fill="#EF2700" />
        </svg>
      </div>
      <div className="pb-10 px-5 max-w-7xl mx-auto">
        <h2 className="font-helvetica font-medium leading-[1.2] lg:leading-none text-[34px] lg:text-[44px]">
          <AnimatedTextCharacter className="text-black font-sans font-semibold" text="Wishes from" />
          <AnimatedTextCharacter className="text-[#EF4123] font-serif mt-1 font-normal" text="Ministers" />
        </h2>

        {/* Mobile: Swiper */}
        {isMobile  ? (
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
            {allGreetings.map((item) => (
              <SwiperSlide key={item.id}>
                <MinisterCard item={item} onClick={() => openModal(item.greetingsImageUrl)} />
              </SwiperSlide>
            ))}
          </Swiper>
          {swiperInstance && <CustomBulletPagination swiper={swiperInstance} total={allGreetings.length} />}
          </>
        ) : (
          // Desktop: Grid
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3} // show 3 cards in desktop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="mt-8 lg:mt-12 !pb-10"
          >
            {allGreetings.map((item) => (
              <SwiperSlide key={item.id}>
                <MinisterCard item={item} onClick={() => openModal(item.greetingsImageUrl)} />
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

       

        {/* The NEW "View More" Modal */}
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
                className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-12 flex flex-col"
              >
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h2 className="font-helvetica  font-medium leading-none text-[32px]  lg:text-[44px]">
                    <AnimatedTextCharacter className="text-black font-sans font-semibold" text="Wishes from" />
                    <AnimatedTextCharacter className="text-[#EF4123] font-serif mt-1 font-normal" text="Ministers" />
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
                        {featuredMinister && (
                          <motion.div
                            key={activeIndex} // Key change triggers animation
                            variants={cardTransitionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full h-full"
                          >
                            <MinisterCardModel item={featuredMinister} onClick={() => handleGreetingClick(featuredMinister.greetingsImageUrl)} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Side: Other Ministers & Next Button */}
                    <div className="hidden md:grid col-span-6 row-span-3 grid-cols-2 grid-rows-3 gap-4">
                      {otherMinisters.map((item) => (
                        <div
                          key={item.id}
                          className="cursor-pointer group overflow-hidden  shadow-md"
                          onClick={() => handleGreetingClick(item.greetingsImageUrl)}
                        >
                          <Image
                            src={item.coverImageUrl}
                            alt={item.name}
                            width={400}
                            height={533}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                      {/* --- CHANGE 6: The "Next" Button in the last grid slot --- */}
                      {allGreetings.length > 1 && (
                        <div className="flex items-center justify-center  ">
                          <button
                            onClick={handleNext}
                            className="flex flex-col pl-4 justify-end w-full h-full transition-colors duration-300 "
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

        {/* Original Modal for single image view */}
        <AnimatePresence>
          {isModalOpen && currentImageUrl && (
            <motion.div
              className="fixed md:h-[90vh] h-[90%] my-10 inset-0 z-[9999] flex items-center justify-center overflow-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80 backdrop-blur-lg" onClick={closeModal} />
              <motion.div
                ref={singleImageModalRef}
                variants={modalVariants}
                className="relative my-10 w-full md:h-[80vh] h-[90%] max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-14"
              >
                <motion.button
                  variants={contentVariants}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconX className="text-white w-5 h-5" />
                </motion.button>

                <motion.div variants={contentVariants} className="flex items-center justify-center w-full h-[100%] ">
                  <Image
                    src={currentImageUrl}
                    alt="Selected"
                    className="md:h-full max-h-[85vh] w-full object-cover rounded-lg"
                    height={1000}
                    width={1000}
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecondGreetingsSection;


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