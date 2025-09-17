"use client";

import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // <-- 1. Import toast
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import "react-phone-number-input/style.css"; // Base styles are still needed

import { AnimatePresence, motion } from "framer-motion";
import CustomToast from "./ToastComponent";

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
  showPopup: boolean;
}






// --- 1. NEW: Component to inject CSS directly into the page ---

const PhoneInputStyles = () => (
  <style>{`

    .custom-phone-input {

      display: flex;

      align-items: center;

      width: 100%;

    }



    /* Style the country select dropdown */

    .custom-phone-input .PhoneInputCountry {

      margin: 0.5rem 0 0.5rem 0.75rem; /* Adjust spacing as needed */

    }



    /* Style the main phone number input field */

    .custom-phone-input .PhoneInputInput {

      flex: 1; /* Allow the input to take up remaining space */

      border: none;

      outline: none;

      background-color: transparent; /* Make it transparent */

      padding: 0.75rem 1rem 0.75rem 0.5rem; /* py-3 px-4 equivalent */

      color: #4a2e20; /* Match your text color */

      font-size: 1rem; /* Adjust font size */

      width: 100%; /* Ensure it fills the container */

    }



    .custom-phone-input .PhoneInputInput::placeholder {

      color: rgba(107, 114, 128, 0.8); /* Match your placeholder color */

    }

  `}</style>
);

const BirthdayGreetingCard: React.FC<BirthdayGreetingCardProps> = ({ onClose, showPopup }) => {
  // State to manage the form inputs
  const [name, setName] = useState<string>("");
   const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false); // <-- 2. Add loading state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number.");

      setLoading(false);

      return;
    }

    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ name, phoneNumber }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await res.json();

      console.log("WhatsApp API Response:", data);

      setShowToast(true);
      setToastMessage("Thank you! Your greetings have been sent successfully.");
      // --- 4. Show success toast ---

      setName("");

      setPhoneNumber(undefined);

      onClose();
    } catch (error) {
      console.error("Submission Error:", error);

      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";

      toast.error(errorMessage);
    } finally {
      setLoading(false); // <-- Set loading to false after completion
      onClose();
    }
  };

  return (
    // Main container with background, border, and relative positioning for decorations
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
         <PhoneInputStyles />

      <div className="relative font-sans bg-[#ffff] text-[#4a2e20] max-w-3xl  mx-auto my-8 p-8 pt-12 rounded-lg border-2 border-[#a98e71] shadow-2xl overflow-hidden">
        <div className="absolute inset-2 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-3 bg-[#002c5a] rounded-full text-white p-1 text-sm font-semibold z-10 hover:bg-opacity-90 transition-opacity"
        >
          <IconX className="text-white w-5 h-5" />
        </button>

        <div className="absolute md:top-6 top-8 left-6 text-3xl text-[#F37032] opacity-80 -rotate-12">✦</div>

        <div className="absolute md:top-6 top-8 right-6 text-3xl text-[#F37032] opacity-80 rotate-12">✦</div>

        <div className="absolute md:bottom-6 bottom-8 left-6 text-3xl text-[#F37032] opacity-80 rotate-12">✦</div>

        <div className="absolute md:bottom-6 bottom-8 right-6 text-3xl text-[#F37032] opacity-80 -rotate-12">✦</div>

        <header className="flex justify-center mb-6 z-10">
          <Image
            width={1000}
            height={1000}
            src="/images/backgroundImage/popupImage.webp"
            alt="Happy 90th Birthday Dr. Ramdas M Pai"
            className="md:w-48 w-33 h-auto"
          />
        </header>

        <main className="text-center mb-8 px-4 z-10">
          <p className="text-md md:text-xl leading-relaxed text-gray-800">
            Wishing a{" "}
            <strong>
              very happy 90<sup>th</sup> birthday
            </strong>{" "}
            to the visionary leader who placed Manipal on the global map. Thank you for your constant inspiration.
          </p>
        </main>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full z-10">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-xs bg-gray-200 rounded-lg md:px-4 md:py-3 py-2 px-4 placeholder-gray-500/80 text-[#4a2e20] border-none focus:ring-2 focus:ring-[#8a6c4d] focus:outline-none shadow-inner"
            required
            disabled={loading}
          />

          <div className="w-full max-w-xs bg-gray-200 rounded-lg flex items-center shadow-inner focus-within:ring-2 focus-within:ring-[#8a6c4d]">
            <PhoneInput
              international
              countryCallingCodeEditable={true}
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter number"
              disabled={loading}
              className="custom-phone-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#F37032] cursor-pointer text-white font-semibold md:px-12 md:py-3 py-2 px-12 mt-2 rounded-lg hover:bg-[#5a2124] transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send your Greetings"}
          </button>
        </form>
      </div>
        </div>
      )}
      {showToast && <CustomToast message={toastMessage} visible={showToast} onClose={() => setShowToast(false)} />}
    </>
  );
};

export default BirthdayGreetingCard;





