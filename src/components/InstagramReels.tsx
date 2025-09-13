"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useOutsideClick } from "./UseOutsideClick";
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

// Instagram reel data
const reels = [
  {
    id: "1",
    thumbnail: "/images/reels/1.jpg",
    videoUrl: "https://www.instagram.com/reel/DOdaiD0EsUo/embed",
  },
  {
    id: "2",
    thumbnail: "/images/reels/2.jpg",
    videoUrl: "https://www.instagram.com/reel/DOYx1jsk-oQ/embed",
  },
  {
    id: "3",
    thumbnail: "/images/reels/3.jpg",
    videoUrl: "https://www.instagram.com/reel/DOVlpTJgHbG/embed",
  },
  {
    id: "4",
    thumbnail: "/images/reels/1.jpg",
    videoUrl: "https://www.instagram.com/reel/DOQ-0YUCTK4/embed",
  },
];

const InstagramReels: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
 const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const openModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
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
const videosToShow = isMobile ? reels.slice(0, 1) : reels;
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      {/* Reels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videosToShow.map((reel) => (
          <div
            key={reel.id}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 aspect-[9/16]"
            onClick={() => openModal(reel.videoUrl)}
          >
            <img
              src={reel.thumbnail}
              alt="Reel Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
      </div>
      <div className=" flex justify-center mt-8">
           <Link href="/reels"> <button
            className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold"
          >
            View more
          </button></Link>
        </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-auto"
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
              className="relative w-full max-w-md mx-auto bg-black rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
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

              {/* Instagram Reel Embed */}
              <motion.div variants={contentVariants} className="w-full mt-2 flex justify-center">
                <iframe
                  className="w-full max-h-[80vh] aspect-[9/16] rounded-2xl"
                  src={currentVideo}
                  title="Instagram Reel"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstagramReels;
