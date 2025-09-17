"use client";

import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // <-- 1. Import toast

import { AnimatePresence, motion } from "framer-motion";

const toastVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3 } },
};

interface CustomToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}
// --- Component ---
interface BirthdayGreetingCardProps {
  onClose: () => void;
}
const CustomToast: React.FC<CustomToastProps> = ({ message, visible, onClose }) => {
  // Auto close after 3s
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="custom-toast"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]"
        >
          <div className="relative font-sans bg-white text-[#4a2e20] p-6 rounded-lg border-2 border-[#a98e71] shadow-2xl flex flex-col items-center justify-center text-center max-w-sm">
            <div className="absolute inset-1 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

            {/* Toast image */}
            <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <Image width={150} height={150} src="/images/backgroundImage/popupImage.webp" alt="Toast Icon" className="w-24 h-auto mb-4" />
            </motion.div>

            {/* Toast message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-md font-semibold leading-relaxed text-gray-800"
            >
              {message}
            </motion.p>

            {/* Decorations */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-2 left-2 text-xl text-[#002c5a] rotate-6"
            >
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute bottom-2 right-2 text-xl text-[#9a2a3c] -rotate-6"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BirthdayGreetingCard: React.FC<BirthdayGreetingCardProps> = ({ onClose }) => {
  // State to manage the form inputs
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // <-- 2. Add loading state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // <-- Set loading to true on submit
    if (phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    // --- 3. Use try...catch to handle success and error ---
    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber }),
      });

      if (!res.ok) {
        // If response is not OK (e.g., 400, 500 error), throw an error
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await res.json();
     

      // --- 4. Show success toast ---

      setToastMessage("Thank you! Your greetings have been sent successfully.");
      setShowToast(true);
      // Reset form and close modal
      setName("");
      setPhoneNumber("");
      onClose();
    } catch (error) {
      console.error("Submission Error:", error);
      // --- 5. Show error toast ---
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // <-- Set loading to false after completion
    }
  };

  return (
    // Main container with background, border, and relative positioning for decorations
    <div className="relative font-sans bg-[#ffff] text-[#4a2e20] max-w-3xl  mx-auto my-8 p-8 pt-12 rounded-lg border-2 border-[#a98e71] shadow-2xl overflow-hidden">
      {/* Decorative inner frame */}
      <div className="absolute inset-2 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 cursor-pointer right-3 bg-[#002c5a] rounded-full text-white p-1 text-sm font-semibold z-10 hover:bg-opacity-90 transition-opacity"
      >
        <IconX className="text-white w-5 h-5" />
      </button>

      {/* Decorative Corner Stars */}
      <div className="absolute md:top-6 top-8 left-6 text-3xl text-[#F37032] opacity-80 -rotate-12">✦</div>
      <div className="absolute md:top-6 top-8 right-6 text-3xl text-[#F37032] opacity-80 rotate-12">✦</div>
      <div className="absolute md:bottom-6 bottom-8 left-6 text-3xl text-[#F37032] opacity-80 rotate-12">✦</div>
      <div className="absolute md:bottom-6 bottom-8 right-6 text-3xl text-[#F37032] opacity-80 -rotate-12">✦</div>

      {/* --- Header Section --- */}
      <header className="flex justify-center mb-6 z-10">
        <Image
          width={1000}
          height={1000}
          src="/images/backgroundImage/popupImage.webp" // IMPORTANT: Replace with the actual path to your image
          alt="Happy 90th Birthday Dr. Ramdas M Pai"
          className="md:w-48 w-33 h-auto"
        />
      </header>

      {/* --- Message Section --- */}
      <main className="text-center mb-8 px-4 z-10">
        <p className="text-md md:text-xl leading-relaxed text-gray-800">
          Wishing a{" "}
          
            very happy 90<sup>th</sup> birthday
         
          to the visionary leader who placed Manipal on the global map. Thank you for your constant inspiration.
        </p>
      </main>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full z-10">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-xs bg-gray-200 rounded-lg  md:px-4 md:py-3 py-2 px-4 placeholder-gray-500/80 text-[#4a2e20] border-none focus:ring-2 focus:ring-[#8a6c4d] focus:outline-none shadow-inner"
          required
          disabled={loading} // <-- Disable input when loading
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhoneNumber(value);
          }}
          maxLength={10}
          pattern="[0-9]{10}"
          title="Please enter exactly 10 digits"
          className="w-full max-w-xs bg-gray-200 rounded-lg md:px-4 md:py-3 py-2 px-4 placeholder-gray-500/80 text-[#4a2e20] border-none focus:ring-2 focus:ring-[#8a6c4d] focus:outline-none shadow-inner"
          required
          disabled={loading} // <-- Disable input when loading
        />

        <button
          type="submit"
          disabled={loading} // <-- Disable button when loading
          className="bg-[#F37032] cursor-pointer text-white font-semibold md:px-12 md:py-3 py-2 px-12 mt-2 rounded-lg hover:bg-[#5a2124] transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed" // <-- Add disabled styles
        >
          {loading ? "Sending..." : "Send your Greetings"} {/* <-- Change button text while loading */}
        </button>
      </form>
      <CustomToast message={toastMessage} visible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default BirthdayGreetingCard;
