"use client";
import Architect from "@/components/Architect";
import Awards from "@/components/Awards";
import DoyenSection from "@/components/DoyenSection";
import FirsrGreetingsSection from "@/components/FirstGreetingSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Iframe from "@/components/Iframe";

import BirthdayGreetingCard from "@/components/InitialPopup";
import InstagramReels from "@/components/InstagramReels";
import LegacySection from "@/components/LegacyPics";
import LegacyPictures from "@/components/LegacyPictures";
import SecondGreetingsSection from "@/components/SecondGreetingsSection";
import TwitterSection from "@/components/TwiterSection";

import Image from "next/image";

import { useEffect, useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      // sessionStorage.setItem("hasShownPopup", "false"); // store in session
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Make this the main container
    <main className="relative h-screen w-screen overflow-x-hidden">
      {/* Position the header absolutely on top */}
      <header className=" top-0 left-0 right-0 z-10 flex justify-between  py-6 mx-auto container px-2">
        <Image src={"/images/logo.svg"} alt="logo" className="hidden lg:block" width={239} height={63} />
        <Image src={"/images/logo.svg"} alt="logo" className="lg:hidden" width={159} height={63} />
        <Image src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className=" w-[49%] md:w-auto  block object-contain" />
      </header>
      {/* 4. Conditionally render the popup */}

      <BirthdayGreetingCard showPopup={showPopup} onClose={() => setShowPopup(false)} />

      {/* The HeroSection now fills the main container */}
      <HeroSection />
      {/* <FirsrGreetingsSection /> */}
      {/* <SecondGreetingsSection /> */}
      {/* <WishCounterComponent /> */}
      <InstagramReels />

      {/* <TributeSection /> */}
      {/* <ImageGallery /> */}

      {/* <LegacyPictures /> */}

      <TwitterSection />

      <Architect />

      <DoyenSection />

      <Awards />
      <LegacySection />
      <Iframe />

      <Footer />
    </main>
  );
}
