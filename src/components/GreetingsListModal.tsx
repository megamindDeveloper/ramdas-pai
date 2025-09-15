// components/GreetingsListModal.tsx

import React from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { MinisterCard } from "./MinisterCard";


// Define the component's props
type GreetingItem = {
  id: string;
  coverImageUrl: string;
  greetingsImageUrl: string;
  name: string;
  position: string;
};

type GreetingsListModalProps = {
  greetings: GreetingItem[];
  onClose: () => void;
  openImageModal: (imageUrl: string) => void;
};

// Framer Motion variants for smooth animations
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
};

export const GreetingsListModal: React.FC<GreetingsListModalProps> = ({
  greetings,
  onClose,
  openImageModal,
}) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close modal on backdrop click
    >
      <motion.div
        variants={modalVariants}
        className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-xl p-6 md:p-8"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <IconX size={28} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Wishes from Ministers
        </h2>

        <div className="h-[calc(100%-60px)] overflow-y-auto pr-2">
          {greetings.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {greetings.map((item) => (
                <MinisterCard
                  key={item.id}
                  item={item}
                  onClick={() => openImageModal(item.greetingsImageUrl)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">Loading wishes...</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};