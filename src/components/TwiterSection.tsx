"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconX, IconBrandTwitter } from "@tabler/icons-react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { useInView } from "framer-motion";
// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

// Framer-motion variants
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

type ScreenshotItem = {
  id: string;
  name: string;
  screenshotUrl: string;
};

// Card for displaying the tweet screenshot
const TweetCard = ({ item, onClick }: { item: ScreenshotItem; onClick: () => void }) => (
  <div className="  text-black  flex flex-col cursor-pointer" onClick={onClick}>
    <div className="flex-grow  overflow-hidden">
      <Image loading="lazy" height={800} width={800} src={item.screenshotUrl} alt="Tweet Screenshot" className="rounded-2xl w-full h-full object-contain" />
    </div>
  </div>
);
const MinisterCardModel = ({ item, onClick }: { item: GreetingItem; onClick: () => void }) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden group   shadow-md" // Added rounded-lg and shadow-md for card appearance
      onClick={onClick}
    >
      <Image
        src={item.coverImageUrl}
        alt={`Portrait of ${item.name}`}
        className="w-full h-full object-cover "
        width={800}
        height={1067}
        loading="lazy"
      />
    </div>
  );
};

const TwitterSection: React.FC = ({
  initial = 0, // target value
  base = 0, // starting value for animation
  storageKey = "wish_counter_value",
}: {
  initial?: number;
  base?: number;
  storageKey?: string;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  // State for main page display
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [allGreetings, setAllGreetings] = useState<GreetingItem[]>([]);
  // State for ALL screenshots for the "View More" modal
  const [allScreenshots, setAllScreenshots] = useState<ScreenshotItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // State for single image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // State for "View More" modal
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);

  // Refs for closing modals on outside click
  const singleImageModalRef = useRef<HTMLDivElement>(null);
  const viewMoreModalRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (allGreetings.length > 1) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % allGreetings.length);
    }
  };
  // Fetch latest 3 screenshots for the main page
  useEffect(() => {
    const colRef = collection(db, "Screenshots");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(3));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ScreenshotItem));
      setScreenshots(items);
    });
    return () => unsub();
  }, []);

  // Fetch ALL screenshots for the modal
  useEffect(() => {
    const colRef = collection(db, "Screenshots");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ScreenshotItem));
      setAllScreenshots(items);
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    const colRef = collection(db, "Screenshots");
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const items: GreetingItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          coverImageUrl: data.screenshotUrl || "",
        };
      });
      setAllGreetings(items);
    });

    return () => unsub();
  }, []);
  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Modal Control Functions ---
  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closeViewMoreModal = () => setIsViewMoreModalOpen(false);
  const featuredMinister = allGreetings[activeIndex];
  // The small cards show everyone *except* the featured one, limited to 5
  const otherMinisters = allGreetings.filter((_, index) => index !== activeIndex).slice(0, 5);
  // Handles click from "View More" modal to open single image modal
  const handleScreenshotClick = (imageUrl: string) => {
    closeViewMoreModal();
    setTimeout(() => openModal(imageUrl), 200);
  };

  // Hooks for closing modals
  useOutsideClick(singleImageModalRef, closeModal);
  useOutsideClick(viewMoreModalRef, closeViewMoreModal);

  // Effect for Escape key and body overflow
  useEffect(() => {
    const isAnyModalOpen = isModalOpen || isViewMoreModalOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) closeModal();
        else if (isViewMoreModalOpen) closeViewMoreModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, isViewMoreModalOpen]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true }); // triggers only once when in view
  const [wishesCount, setWishesCount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const colRef = collection(db, "wishes");
    const unsub = onSnapshot(colRef, (snapshot) => {
      setWishesCount(snapshot.size); // snapshot.size gives total docs
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    if (!isInView || wishesCount === 0) return;
  
    let start = 0;
    let end = wishesCount;
    let duration = 2000; // 2s animation
    let startTimestamp: number | null = null;
  
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setCount(value);
  
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
  
    requestAnimationFrame(step);
  }, [isInView, wishesCount]);
  
  
  return (
    <div ref={containerRef} className="md:py-20 py-10 px-4 bg-gradient-to-r from-[#FF953E] via-[#F96E38] to-[#EE4023] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-helvetica  font-medium leading-[1.2]  lg:leading-none text-[32px] lg:text-[44px]">
          <AnimatedTextCharacter text="Greetings from Wellwishers" className="text-white mb-2 font-semibold font-sans" />
        </h2>

        <div className="flex flex-col md:flex-row lg:items-center  gap-3 md:gap-10 mb-6 md:my-6  md:text-left">
          <div className="font-bold text-[56px] lg:text-8xl font-sans ">  {count}</div>
          <div className="max-w-xl flex">
            <p className="font-light text-[16px]">Countless warm wishes have already made this celebration special!</p>
            <p className="m font-light">
              Celebrate the journey of <strong className="font-bold"> Dr. Ramdas M. Pai</strong> with your message.
            </p>
          </div>
        </div>

        {/* Swiper for Mobile */}
        {isMobile && allScreenshots.length > 0 && (
          <>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              onSwiper={setSwiperInstance}
              observer={true}
              observeParents={true}
            >
              {allScreenshots.map((item) => (
                <SwiperSlide key={item.id}>
                  <TweetCard item={item} onClick={() => openModal(item.screenshotUrl)} />
                </SwiperSlide>
              ))}
            </Swiper>

            {swiperInstance && <CustomBulletPagination swiper={swiperInstance} total={allScreenshots.length} />}
          </>
        )}

        {!isMobile && (
          // Grid for Desktop

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
            {allScreenshots.map((item) => (
              <SwiperSlide key={item.id}>
                <TweetCard key={item.id} item={item} onClick={() => openModal(item.screenshotUrl)} />
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
            className="uppercase cursor-pointer border-2 border-white  text-[#EF2700] px-8 py-3 font-helvetica font-bold bg-white"
          >
            View more
          </button>
        </div>

        {/* --- NEW: "View More" Modal --- */}
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
                    <AnimatedTextCharacter className="text-black font-sans font-semibold" text="Greetings from " />
                    <AnimatedTextCharacter className="text-[#EF4123] font-serif mt-1 font-normal" text="Wellwishers" />
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
                          className="cursor-pointer group overflow-hidden "
                          onClick={() => handleGreetingClick(item.greetingsImageUrl)}
                        >
                          <Image
                            src={item.coverImageUrl}
                            alt={item.name}
                            width={400}
                            height={533}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                      {/* --- CHANGE 6: The "Next" Button in the last grid slot --- */}
                      {allGreetings.length > 1 && (
                        <div className="flex items-center justify-center  ">
                          <button
                            onClick={handleNext}
                            className="flex flex-col items-center cursor-pointer justify-center w-full h-full transition-colors duration-300 "
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
        {/* Single Image Modal */}
        <AnimatePresence>
          {isModalOpen && currentImage && (
            <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" initial="hidden" animate="visible" exit="exit">
              <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80" onClick={closeModal} />
              <motion.div
                ref={singleImageModalRef}
                variants={modalVariants}
                className="relative w-full max-w-md h-auto bg-white rounded-2xl shadow-2xl p-4"
              >
                <motion.button onClick={closeModal} /* ... */>
                  {" "}
                  <IconX className="text-white w-5 h-5" />{" "}
                </motion.button>
                <div className="mt-4">
                  <Image
                    loading="lazy"
                    width={1000}
                    height={1000}
                    src={currentImage}
                    alt="Selected Tweet"
                    className="w-full h-auto object-contain rounded-lg max-h-[80vh]"
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

export default TwitterSection;

const CustomBulletPagination: React.FC<{ swiper: any; total: number }> = ({ swiper, total }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // number of bullets you want to show at a time
  const visibleBullets = 3;

  useEffect(() => {
    if (!swiper) return;
    const onSlideChange = () => setActiveIndex(swiper.realIndex);
    swiper.on("slideChange", onSlideChange);
    return () => {
      swiper.off("slideChange", onSlideChange);
    };
  }, [swiper]);

  // Compute the "window" of bullets to show
  const start = Math.floor(activeIndex / visibleBullets) * visibleBullets;
  const bullets = Array.from({ length: visibleBullets }).map((_, i) => {
    const index = (start + i) % total; // loop around total slides
    return { index, isActive: index === activeIndex };
  });

  return (
    <div className="md:hidden flex justify-center gap-2 my-4">
      {bullets.map((b) => (
        <button
          key={b.index}
          onClick={() => swiper.slideToLoop(b.index)}
          className={`w-3 h-3 rounded-full transition-all ${b.isActive ? "bg-red-600 scale-125" : "bg-[#ebebeb] scale-100"}`}
        />
      ))}
    </div>
  );
};
