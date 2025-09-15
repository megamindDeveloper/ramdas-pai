"use client";
import Architect from "@/components/Architect";
import Awards from "@/components/Awards";
import DoyenSection from "@/components/DoyenSection";
import FirsrGreetingsSection from "@/components/FirstGreetingSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Iframe from "@/components/Iframe";
import ImageGallery from "@/components/ImageSection";
import BirthdayGreetingCard from "@/components/InitialPopup";
import InstagramReels from "@/components/InstagramReels";
import LegacyPictures from "@/components/LegacyPictures";
import SecondGreetingsSection from "@/components/SecondGreetingsSection";
import TributeSection from "@/components/TributeSection";
import TwitterSection from "@/components/TwiterSection";
import WishCounterComponent from "@/components/WishCounterComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  // 3. Effect to show the popup after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000); // 1000ms = 1 second

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty array ensures this runs only once on page load

  return (
    // Make this the main container
    <main className="relative h-screen w-screen overflow-x-hidden">
      {/* Position the header absolutely on top */}
      <header className=" top-0 left-0 right-0 z-10 flex justify-center lg:justify-between  py-6 mx-auto container">
        <img src={"/images/logo.svg"} alt="logo" className="hidden lg:block" width={239} height={63} />
        <img src={"/images/logo.svg"} alt="logo" className="lg:hidden" width={159} height={63} />
        <img src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className="hidden lg:block object-contain" />
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
      <FirsrGreetingsSection/>
      <SecondGreetingsSection/>
      <WishCounterComponent/>
      <InstagramReels />
      <section
        style={{
          backgroundImage: "url('/images/backgroundImage/bg1.png')",
        }}
      >
        {/* <TributeSection /> */}
        <ImageGallery />
        <TwitterSection />

        <Architect />
      </section>
      <DoyenSection />
      <section
        style={{
          backgroundImage: "url('/images/backgroundImage/bg1.png')",
        }}
      >

        <LegacyPictures />
      </section>
      <Awards />
      <Iframe />

      <Footer />
    </main>
  );
}
