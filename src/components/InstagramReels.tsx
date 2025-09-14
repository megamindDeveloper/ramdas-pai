"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useOutsideClick } from "./UseOutsideClick";
import Link from "next/link";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

// Firebase
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// Framer-motion variants (same as your code)
const backdropVariants = { hidden: { opacity: 0, backdropFilter: "blur(0px)" }, visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3, ease: "easeOut" } }, exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2, ease: "easeIn" } } };
const modalVariants = { hidden: { opacity: 0, scale: 0.8, y: 50 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", type: "spring", damping: 20, stiffness: 100 } }, exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.25, ease: "easeIn" } } };
const contentVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.1 } } };

type ReelItem = {
  id: string;
  name: string;
  designation: string;
  thumbnailUrl: string;
  reelsUrl: string;
};

const InstagramReels: React.FC = () => {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch latest 8 reels from Firestore
  useEffect(() => {
    const colRef = collection(db, "Reels");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(8));

    const unsub = onSnapshot(q, (snapshot) => {
      const items: ReelItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "",
          designation: data.designation || "",
          thumbnailUrl: data.thumbnailUrl || "",
          reelsUrl: data.reelsUrl || "",
        };
      });
      setReels(items);
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

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  const videosToShow = isMobile ? reels.slice(0, 1) : reels;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="font-helvetica text-center font-medium leading-none text-[32px] lg:text-[44px]">
        <AnimatedTextCharacter text="Wishes from MAHE Leadership" />
      </h2>

      <div className="grid grid-cols-2 mt-8 lg:mt-12 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videosToShow.map((reel) => (
          <div
            key={reel.id}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 aspect-auto flex flex-col"
            onClick={() => openModal(reel.reelsUrl)}
          >
            <img src={reel.thumbnailUrl} alt="Reel Thumbnail" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white 
                bg-gradient-to-t from-black/70 via-black/30 to-transparent">
  <p className="font-semibold text-sm">{reel.name}</p>
  <p className="text-xs opacity-80">{reel.designation}</p>
</div>

          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/social-media-wishes">
          <button className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">
            View more
          </button>
        </Link>
      </div>

      <AnimatePresence>
        {isModalOpen && currentVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={backdropVariants} className="fixed inset-0 bg-black/80 backdrop-blur-lg" onClick={closeModal} />

            <motion.div
              ref={containerRef}
              variants={modalVariants}
              className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8"
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
