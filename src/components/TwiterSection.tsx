"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconX, IconBrandTwitter } from "@tabler/icons-react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

// Framer-motion variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, backdropFilter: "blur(8px)" },
  exit: { opacity: 0 },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20, stiffness: 100 } },
  exit: { opacity: 0, scale: 0.9 },
};
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
};

type ScreenshotItem = {
  id: string;
  name: string;
  screenshotUrl: string;
};

// Card for displaying the tweet screenshot
const TweetCard = ({ item, onClick }: { item: ScreenshotItem; onClick: () => void }) => (
  <div className="bg-white rounded-full  text-black  flex flex-col cursor-pointer " onClick={onClick}>
    <div className="flex-grow rounded-lg overflow-hidden">
      <Image loading="lazy" height={800} width={800} src={item.screenshotUrl} alt="Tweet Screenshot" className="w-full h-full object-contain" />
    </div>
  </div>
);

const TwitterSection: React.FC = () => {
  // State for main page display
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // State for ALL screenshots for the "View More" modal
  const [allScreenshots, setAllScreenshots] = useState<ScreenshotItem[]>([]);

  // State for single image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // State for "View More" modal
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);

  // Refs for closing modals on outside click
  const singleImageModalRef = useRef<HTMLDivElement>(null);
  const viewMoreModalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="py-20 px-4 bg-gradient-to-r from-[#FF953E] via-[#F96E38] to-[#EE4023] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-helvetica text-center font-medium  leading-none text-[32px] lg:text-[44px]">
          <AnimatedTextCharacter text="Greetings from Wellwishers" className="text-white mb-2 font-semibold font-sans" />
        </h2>

        <div className="flex flex-col md:flex-row items-center  gap-6 md:gap-10 my-6 text-center md:text-left">
          <div className="font-bold text-7xl lg:text-8xl font-sans ">9384</div>
          <div className="max-w-xl flex">
            <p className="font-light text-[16px]">Countless warm wishes have already made this celebration special!</p>
            <p className="m font-light">
              Celebrate the journey of <strong className="font-bold"> Dr. Ramdas M. Pai</strong> with your message.
            </p>
          </div>
        </div>

        {/* Swiper for Mobile */}
        {isMobile ? (
          <Swiper /* ... */>
            {screenshots.map((item) => (
              <SwiperSlide key={item.id}>
                <TweetCard item={item} onClick={() => openModal(item.screenshotUrl)} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Grid for Desktop
          <div className="grid grid-cols-1 mt-8 lg:mt-12 md:grid-cols-3 gap-8">
            {screenshots.map((item) => (
              <TweetCard key={item.id} item={item} onClick={() => openModal(item.screenshotUrl)} />
            ))}
          </div>
        )}

        <div className="flex  mt-12">
          {/* UPDATED: Button now opens the modal */}
          <button
            onClick={() => setIsViewMoreModalOpen(true)}
            className="uppercase cursor-pointer border-2 border-white  text-[#EF2700] px-8 py-3 font-helvetica font-bold bg-white"
          >
            View more
          </button>
        </div>

        {/* --- NEW: "View More" Modal --- */}
        <AnimatePresence>
          {isViewMoreModalOpen && (
            <motion.div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" initial="hidden" animate="visible" exit="exit">
              <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80" onClick={closeViewMoreModal} />
              <motion.div
                ref={viewMoreModalRef}
                variants={modalVariants}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl p-6 flex flex-col"
              >
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                  <h3 className="text-2xl font-bold text-gray-800">Greetings from Wellwishers</h3>
                  <motion.button
                    onClick={closeViewMoreModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center"
                  >
                    <IconX className="text-white" />
                  </motion.button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                  <motion.div variants={contentVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {allScreenshots.map((item) => (
                      <div
                        key={item.id}
                        className="cursor-pointer group overflow-hidden rounded-lg shadow-md"
                        onClick={() => handleScreenshotClick(item.screenshotUrl)}
                      >
                        <Image
                          src={item.screenshotUrl}
                          alt="Tweet Screenshot"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
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
