"use client"

import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

// --- Component ---
interface BirthdayGreetingCardProps {
    onClose: () => void;
  }
  const BirthdayGreetingCard: React.FC<BirthdayGreetingCardProps> = ({ onClose }) => {
  // State to manage the form inputs
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const res = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneNumber }),
    });
  
    const data = await res.json();
    console.log("WhatsApp API Response:", data);
  
    // Reset form
    setName("");
    setPhoneNumber("");
    onClose();
  };
  
  

  return (
    // Main container with background, border, and relative positioning for decorations
    <div className="relative font-sans bg-[#fdf3de] text-[#4a2e20] max-w-4xl mx-auto my-8 p-8 pt-12 rounded-lg border-2 border-[#a98e71] shadow-2xl overflow-hidden">
      
      {/* Decorative inner frame */}
      <div className="absolute inset-2 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

      {/* Close Button */}
      <button  onClick={onClose}  className="absolute top-3 cursor-pointer right-3 bg-[#002c5a] text-white px-4 py-1 rounded-md text-sm font-semibold z-10 hover:bg-opacity-90 transition-opacity">
      <IconX className="text-white w-5 h-5" />
      </button>

      {/* Decorative Corner Stars */}
      <div className="absolute top-6 left-6 text-3xl text-[#002c5a] opacity-80 -rotate-12">✦</div>
      <div className="absolute top-6 right-6 text-3xl text-[#9a2a3c] opacity-80 rotate-12">✦</div>
      <div className="absolute bottom-6 left-6 text-3xl text-[#002c5a] opacity-80 rotate-12">✦</div>
      <div className="absolute bottom-6 right-6 text-3xl text-[#9a2a3c] opacity-80 -rotate-12">✦</div>
      
      {/* Faint background sparkles */}
      <div className="absolute top-1/3 left-1/4 text-gray-300 text-2xl">✧</div>
      <div className="absolute top-1/2 right-1/4 text-gray-300 text-3xl">✧</div>

      {/* --- Header Section --- */}
      <header className="flex justify-center mb-6 z-10">
        {/* The emblem is treated as a single image for simplicity */}
        <img 
          src="/images/backgroundImage/popupImage.png" // IMPORTANT: Replace with the actual path to your image
          alt="Happy 90th Birthday Dr. Ramdas M Pai" 
          className="w-48 h-auto" 
        />
      </header>

      {/* --- Message Section --- */}
      <main className="text-center mb-8 px-4 z-10">
        <p className="text-xl leading-relaxed text-gray-800">
         
          Wishing a very <strong> happy 90<sup>th</sup> birthday</strong> to the
visionary leader who placed Manipal on the global map.
Thank you for your constant inspiration.
        </p>
      </main>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full z-10">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-xs bg-[#f5e6c4] rounded-lg px-4 py-3 placeholder-gray-500/80 text-[#4a2e20] border-none focus:ring-2 focus:ring-[#8a6c4d] focus:outline-none shadow-inner"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full max-w-xs bg-[#f5e6c4] rounded-lg px-4 py-3 placeholder-gray-500/80 text-[#4a2e20] border-none focus:ring-2 focus:ring-[#8a6c4d] focus:outline-none shadow-inner"
          required
        />
        <button
          type="submit"
          className="bg-[#6d282c] text-white font-semibold px-12 py-3 mt-2 rounded-lg hover:bg-[#5a2124] transition-colors duration-300 shadow-md"
        >
          Send your Greetings
        </button>
      </form>
    </div>
  );
};

export default BirthdayGreetingCard;