"use client";

import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // <-- 1. Import toast

// --- Component ---
interface BirthdayGreetingCardProps {
  onClose: () => void;
}
const CustomSuccessToast: React.FC<{ message: string }> = ({ message }) => (
  <div className="relative font-sans bg-[#fdf3de] text-[#4a2e20] p-6 rounded-lg border-2 border-[#a98e71] shadow-2xl flex flex-col items-center justify-center text-center max-w-sm mx-auto">
    <div className="absolute inset-1 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>
    <Image
      width={150} // Adjusted size for toast
      height={150} // Adjusted size for toast
      src="/images/backgroundImage/popupImage.webp"
      alt="Happy 90th Birthday Dr. Ramdas M Pai"
      className="w-24 h-auto mb-4" // Smaller image for the toast
    />
    <p className="text-md font-semibold leading-relaxed text-gray-800">
      {message}
    </p>
    {/* Optional: Add a small star decoration */}
    <div className="absolute top-2 left-2 text-xl text-[#002c5a] opacity-80 rotate-6">✦</div>
    <div className="absolute bottom-2 right-2 text-xl text-[#9a2a3c] opacity-80 -rotate-6">✦</div>
  </div>
);

const BirthdayGreetingCard: React.FC<BirthdayGreetingCardProps> = ({ onClose }) => {
  // State to manage the form inputs
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // <-- 2. Add loading state

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
      console.log("WhatsApp API Response:", data);

      // --- 4. Show success toast ---
      toast.custom(
        (t) => (
          <CustomSuccessToast message="Thank you! Your greetings have been sent successfully." />
        ),
        { duration: 3000 }
      );


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
          Wishing a {" "}
          <strong>
            {" "}very
            happy 90<sup>th</sup> birthday
          </strong>{" "}
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
    </div>
  );
};

export default BirthdayGreetingCard;