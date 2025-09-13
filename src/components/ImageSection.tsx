"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./UseOutsideClick";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

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

// Replace YouTube IDs with image URLs
const images = [
  "/images/legacyImages/Mask group (5).png",
  "/images/legacyImages/Mask group (6).png",
  "/images/legacyImages/Mask group (7).png"
];

const ImageGallery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
 const [isMobile, setIsMobile] = useState(false);

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

  React.useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);
const videosToShow = isMobile ? images.slice(0, 1) : images;
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videosToShow.map((img) => (
          <div
            key={img}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(img)}
          >
            <img
              src={img}
              alt="Gallery Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-3 flex justify-center mt-8">
         <Link href="/images"> <button
            className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold"
          >
            View more
          </button></Link>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && currentImage && (
          <motion.div
            className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center "
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
              className="relative w-full max-w-5xl mx-auto  rounded-3xl shadow-2xl "
            >
              {/* Close Button */}
              <motion.button
                variants={contentVariants}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black flex items-center justify-center cursor-pointer"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="text-white w-5 h-5" />
              </motion.button>

              {/* Full Image */}
              <motion.div variants={contentVariants} className="w-full ">
                <img
                  src={currentImage}
                  alt="Full View"
                  className="max-h-[80vh] w-full rounded-2xl overflow-hidden object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
