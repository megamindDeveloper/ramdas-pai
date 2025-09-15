"use client";

import React, { useState, useRef, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// import { IconX } from "@tabler/icons-react";
// import Link from "next/link";

// import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
// import { db } from "@/app/lib/firebase";
// import { useOutsideClick } from "@/components/UseOutsideClick";
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import Image from "next/image";
import GlimpsesOfDr from "@/components/GlimpsesOfDr";

// Framer-motion variants
// const backdropVariants = {
//   hidden: { opacity: 0, backdropFilter: "blur(0px)" },
//   visible: {
//     opacity: 1,
//     backdropFilter: "blur(8px)",
//     transition: { duration: 0.3, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     backdropFilter: "blur(0px)",
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// };

// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.8, y: 50 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut", type: "spring", damping: 20, stiffness: 100 },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.9,
//     y: 50,
//     transition: { duration: 0.25, ease: "easeIn" },
//   },
// };

// const contentVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.1 } },
// };

type GreetingItem = {
  id: string;
  coverImageUrl: string;
  greetingsImageUrl: string;
  position: string;
  name: string;
};

const SecondGreetingsSection: React.FC = () => {
//   const [greetings, setGreetings] = useState<GreetingItem[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);




  return (
    <>
      <header className=" top-0 left-0 right-0 z-10 flex justify-center lg:justify-between  py-6 mx-auto container">
        <Image src={"/images/logo.svg"} alt="logo" className="hidden lg:block" width={239} height={63} />
        <Image src={"/images/logo.svg"} alt="logo" className="lg:hidden" width={159} height={63} />
        <Image src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className="hidden lg:block object-contain" />
      </header>

      <GlimpsesOfDr/>
    
    </>
  );
};

export default SecondGreetingsSection;
