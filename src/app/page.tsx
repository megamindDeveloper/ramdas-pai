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
import WishCounterComponent from "@/components/WishCounterComponent";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("hasShownPopup");

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("hasShownPopup", "true"); // store in session
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    // Make this the main container
    <main className="relative h-screen w-screen overflow-x-hidden">
      {/* Position the header absolutely on top */}
      <header className=" top-0 left-0 right-0 z-10 flex justify-center lg:justify-between  py-6 mx-auto container">
        <Image src={"/images/logo.svg"} alt="logo" className="hidden lg:block" width={239} height={63} />
        <Image src={"/images/logo.svg"} alt="logo" className="lg:hidden" width={159} height={63} />
        <Image src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className="hidden lg:block object-contain" />
      </header>
      {/* 4. Conditionally render the popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          {/* Pass the function to close the popup */}
          <BirthdayGreetingCard onClose={() => setShowPopup(false)} />
        </div>
      )}
      {/* The HeroSection now fills the main container */}
      <HeroSection />
      <FirsrGreetingsSection />
      <SecondGreetingsSection />
      <WishCounterComponent />
      <InstagramReels />
      <section
        style={{
          backgroundImage: "url('/images/backgroundImage/bg1.webp')",
        }}
      >
        {/* <TributeSection /> */}
        {/* <ImageGallery /> */}

        <LegacyPictures />

        <TwitterSection />

        <Architect />
      </section>
      <DoyenSection />
      <section
        style={{
          backgroundImage: "url('/images/backgroundImage/bg1.webp')",
        }}
      >

      </section>
      
      <Awards />
      <LegacySection/>
      <Iframe />

      <Footer />
    </main>
  );
}
