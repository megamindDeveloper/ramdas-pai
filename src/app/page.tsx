import Architect from "@/components/Architect";
import Awards from "@/components/Awards";
import DoyenSection from "@/components/DoyenSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Iframe from "@/components/Iframe";
import ImageGallery from "@/components/ImageSection";
import InstagramReels from "@/components/InstagramReels";
import LegacyPictures from "@/components/LegacyPictures";
import TributeSection from "@/components/TributeSection";
import TwitterSection from "@/components/TwiterSection";
import WishCounterComponent from "@/components/WishCounterComponent";

export default function Home() {
  return (
    // Make this the main container
    <main className="relative h-screen w-screen overflow-x-hidden">
      {/* Position the header absolutely on top */}
      <header className=" top-0 left-0 right-0 z-10 flex justify-center lg:justify-between  py-6 mx-auto container">
         <img src={"/images/logo.svg"} alt="logo" className="hidden lg:block" width={239} height={63} />
        <img src={"/images/logo.svg"} alt="logo" className="lg:hidden" width={159} height={63} />
        <img src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className="hidden lg:block object-contain" />
      </header>

      {/* The HeroSection now fills the main container */}
      <HeroSection />
      <section style={{ 
    backgroundImage: "url('/images/backgroundImage/bg1.png')" 
  }}>

      <TributeSection />
      <ImageGallery/>
      <InstagramReels/>
      <TwitterSection/>
      <Architect/>
      </section>
      <DoyenSection />
      <section style={{ 
    backgroundImage: "url('/images/backgroundImage/bg1.png')" 
  }}>
      <LegacyPictures/></section>
      <Awards/>
      <Iframe/>
      <WishCounterComponent/>
      <Footer/>
    </main>
  );
}
