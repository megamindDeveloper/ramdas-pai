import Image from "next/image";
import React from "react";
const HeroSection = () => {
  return (
    <div className="h-auto overflow-x-hidden">
      <Image priority fetchPriority="high" width={10000} height={1000} src={"/images/backgroundImage/Web_banner_1440x400.webp"} alt="alter" className="" />
    </div>
  );
};

export default HeroSection;
