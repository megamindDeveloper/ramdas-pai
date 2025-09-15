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

// Example full YouTube URLs (replace with backend data in future)
const sliderVideos = [
  "https://youtu.be/08DCoUv-RQM?si=pl7Bah6meMFO9jlv",
  "https://youtu.be/T5M1QHonSVc?si=roHCHWGpY7hwI0XR",
  "https://youtu.be/DltFQbqdRs0?si=DrKNYSVBKF2XEKjf",
];

// Helper to extract YouTube video ID from full URL
const getYouTubeVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const TributeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl(null);
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

  const videosToShow = isMobile ? sliderVideos.slice(0, 1) : sliderVideos;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videosToShow.map((videoUrl) => {
          const id = getYouTubeVideoId(videoUrl);
          if (!id) return null;
          return (
            <div
              key={id}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(videoUrl)}
            >
              <img
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}

        {/* View More button */}
        <div className="col-span-1 md:col-span-3 flex justify-center mt-8">
          <Link href="/video">
            <button className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">
              View more
            </button>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && currentVideoUrl && (
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
              className="relative w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
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

              {/* YouTube iframe */}
              <motion.div variants={contentVariants} className="aspect-video p-10 w-full mt-2">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "12px" }}
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentVideoUrl)}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

export default TributeSection;
