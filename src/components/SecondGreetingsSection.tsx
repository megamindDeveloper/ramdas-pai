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
    transition: { duration: 0.4, ease: "easeOut", type: "spring", damping: 20, stiffness: 100 },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.1 } },
};

type GreetingItem = {
  id: string;
  coverImageUrl: string;
  greetingsImageUrl: string;
  position: string;
  name: string;
};

const SecondGreetingsSection: React.FC = () => {
  const [greetings, setGreetings] = useState<GreetingItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch greetings from Firestore
  useEffect(() => {
    const colRef = collection(db, "Greetings");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(8));

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

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageUrl(null);
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
        <AnimatedTextCharacter text="Wishes from the Ministers" />
      </h2>

      {/* ✅ Mobile: Swiper */}
      {isMobile ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="mt-8"
        >
          {greetings.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                onClick={() => openModal(item.greetingsImageUrl)}
              >
                <img
                  src={item.coverImageUrl}
                  alt="Cover"
                  className="w-full object-cover rounded-lg aspect-[3/3]"
                />
                <div className="mt-2 text-center text-black">
                  <p className="font-semibold text-md">{item.name}</p>
                  <p className="text-sm">{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // ✅ Desktop: Grid
        <div className="grid grid-cols-1 mt-8 lg:mt-12 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {greetings.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(item.greetingsImageUrl)}
            >
              <img
                src={item.coverImageUrl}
                alt="Cover"
                className="w-full object-cover rounded-lg aspect-[3/3]"
              />
              <div className="mt-2 text-center text-black">
                <p className="font-semibold text-md">{item.name}</p>
                <p className="text-sm">{item.position}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link href="/greetings">
          <button className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">
            View more
          </button>
        </Link>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && currentImageUrl && (
          <motion.div
            className="fixed md:h-[90vh] h-[90%] my-10 inset-0 z-[9999] flex items-center justify-center overflow-auto"
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

              <motion.div
                variants={contentVariants}
                className="flex items-center justify-center w-full h-[90%] mt-2"
              >
                <img
                  src={currentImageUrl}
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

export default SecondGreetingsSection;
