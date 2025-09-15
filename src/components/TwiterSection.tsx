"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";


// Framer-motion variants
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2, ease: "easeIn" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", type: "spring", damping: 20, stiffness: 100 } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.25, ease: "easeIn" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.1 } },
};

type ScreenshotItem = {
  id: string;
  name: string;
  screenshotUrl: string;
};

const TwitterSection: React.FC = () => {
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch latest 8 screenshots from Firestore
  useEffect(() => {
    const colRef = collection(db, "Screenshots");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(8));

    const unsub = onSnapshot(q, (snapshot) => {
      const items: ScreenshotItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "",
          screenshotUrl: data.screenshotUrl || "",
        };
      });
      setScreenshots(items);
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

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  useOutsideClick(containerRef, () => {
    if (isModalOpen) closeModal();
  });

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="font-helvetica text-center font-medium leading-none text-[32px] lg:text-[44px]">
        <AnimatedTextCharacter text="Greetings" />
      </h2>

      {/* ✅ Mobile → Swiper */}
      {isMobile ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop
          className="mt-8"
        >
          {screenshots.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg"
                onClick={() => openModal(item.screenshotUrl)}
              >
                <img src={item.screenshotUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // ✅ Desktop → Grid
        <div className="grid grid-cols-1 mt-8 lg:mt-12 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {screenshots.map((item) => (
            <div
              key={item.id}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(item.screenshotUrl)}
            >
              <img src={item.screenshotUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link href="/tweets">
          <button className="uppercase border-[2px] cursor-pointer border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">
            View more
          </button>
        </Link>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentImage && (
          <motion.div
            className="fixed md:h-[90vh] h-[90%] my-10 inset-0 z-[9999] flex items-center justify-center overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80 backdrop-blur-lg" onClick={closeModal} />
            <motion.div
              ref={containerRef}
              variants={modalVariants}
              className="relative my-10 w-full md:h-[90vh] h-[90%] max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
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

              <motion.div variants={contentVariants} className="flex items-center justify-center w-full h-[90%] mt-2">
                <img src={currentImage} alt="Selected" className="md:max-h-[75vh] max-h-[85vh] w-auto object-contain rounded-lg" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TwitterSection;
