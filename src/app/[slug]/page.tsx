"use client";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useOutsideClick } from "@/components/UseOutsideClick";

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

// Sample Data
const reels = [
  { id: "1", thumbnail: "/images/reel1.jpg", video: "/videos/reel1.mp4" },
  { id: "2", thumbnail: "/images/reel2.jpg", video: "/videos/reel2.mp4" },
];

const videos = [
  { id: "1", thumbnail: "/images/yt1.jpg", video: "https://www.youtube.com/embed/S-hG7x42Y4E" },
  { id: "2", thumbnail: "/images/yt2.jpg", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

const twitter = [
  { id: "1", thumbnail: "/images/twitter1.jpg", video: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
];

const images = [
  { id: "1", thumbnail: "/images/img1.jpg", video: "/images/img1.jpg" },
  { id: "2", thumbnail: "/images/img2.jpg", video: "/images/img2.jpg" },
];

export default function DynamicSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Choose data based on slug
  let cards: { id: string; thumbnail: string; video: string }[] = [];
  switch (slug) {
    case "reels":
      cards = reels;
      break;
    case "video":
      cards = videos;
      break;
    case "twitter":
      cards = twitter;
      break;
    case "images":
      cards = images;
      break;
    default:
      cards = [];
  }

  const openModal = (video: string) => {
    setCurrentVideo(video);
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

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 capitalize text-center">{slug}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 aspect-[9/16]"
            onClick={() => openModal(card.video)}
          >
            <img src={card.thumbnail} alt="Card Thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-40 rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
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
            <motion.div
              variants={backdropVariants}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
              onClick={closeModal}
            />

            <motion.div
              ref={containerRef}
              variants={modalVariants}
              className="relative w-full max-w-md mx-auto bg-black rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
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

              <motion.div variants={contentVariants} className="w-full mt-2 flex justify-center">
                {slug === "reels" ? (
                  <video
                    src={currentVideo}
                    autoPlay
                    muted
                    loop
                    controls={false}
                    className="w-full max-h-[80vh] aspect-[9/16] rounded-2xl object-cover"
                  />
                ) : slug === "images" ? (
                  <img src={currentVideo} alt="Image" className="w-full max-h-[80vh] rounded-2xl object-cover" />
                ) : (
                  <iframe
                    src={currentVideo}
                    title="Video"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full max-h-[80vh] aspect-video rounded-2xl"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
