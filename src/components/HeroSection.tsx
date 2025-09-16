import Image from "next/image";
import React from "react";
import img from "../../public/images/backgroundImage/banner.webp";
import Mobileimg from "../../public/images/backgroundImage/mobile.webp";

const HeroSection = () => {
  return (
    <div className="h-auto overflow-x-hidden">
      <Image src={img} alt="alter" className="hidden md:flex w-[100%]" />
      <div className="relative">
        <Image src={Mobileimg} alt="alter" className=" md:hidden w-[100%]" />
      </div>
    </div>
  );
};

export default HeroSection;
