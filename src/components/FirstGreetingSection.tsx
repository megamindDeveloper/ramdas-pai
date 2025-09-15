"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconX } from "@tabler/icons-react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// ✅ Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination, Autoplay } from "swiper/modules";


// Framer-motion variants
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
  },
};

// Example data
const slider = [
  {
    thumbNailImage: "/thumbnails/president.png",
    wishesImage: "/thumbnails/pmWishLetter.png",
  },
  {
    thumbNailImage: "/thumbnails/primeMinister.png",
    wishesImage: "/thumbnails/pmWishLetter.png",
  },
];

const FirsrGreetingsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentimageUrl, setCurrentimageUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (imageUrl: string) => {
    setCurrentimageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentimageUrl(null);
  };

  useOutsideClick(containerRef, () => {
    if (isModalOpen) closeModal();
  });

  // Disable scroll when modal open + Esc key
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
        <AnimatedTextCharacter text="Wishes from the President and Prime Minister" />
      </h2>

      {/* ✅ Mobile: Swiper */}
      {isMobile ? (
      <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={20}
    pagination={{ clickable: true }}
    autoplay={{
      delay: 1000, // 3s delay
      disableOnInteraction: false, // keep autoplay after user swipes
    }}
    loop={true} // makes it infinite
    className="mt-8"
  >
          {slider.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                onClick={() => openModal(item.wishesImage)}
              >
                <img
                  src={item.thumbNailImage}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // ✅ Desktop: Grid
        <div className="grid grid-cols-1 mt-8 lg:mt-12 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {slider.map((item, index) => (
            <div
              key={index}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(item.wishesImage)}
            >
              <img
                src={item.thumbNailImage}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentimageUrl && (
          <motion.div
            className="fixed md:h-[90vh] my-10 inset-0 z-[9999] flex items-center justify-center overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
              onClick={closeModal}
            />

            {/* Modal content */}
            <motion.div
              ref={containerRef}
              variants={modalVariants}
              className="relative my-10 h-[90vh] w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
            >
              {/* Close Button */}
              <motion.button
                variants={contentVariants}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="text-white w-5 h-5" />
              </motion.button>

              {/* Modal Image */}
              <motion.div
                variants={contentVariants}
                className="flex items-center justify-center w-full h-full mt-2"
              >
                <img
                  src={currentimageUrl}
                  alt="Selected"
                  className="md:max-h-[75vh] max-h-[85vh] w-auto object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FirsrGreetingsSection;
