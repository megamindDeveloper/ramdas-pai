
import Image from 'next/image'
import React from 'react'
import img from "../../public/images/backgroundImage/Web_banner_1440x400 (1).jpg"
import Mobileimg from "../../public/images/backgroundImage/Web-mobile-banner.png"

const HeroSection = () => {
  return (
    <div className='h-auto overflow-x-hidden'>
      <Image  src={img} alt="alter" className='hidden md:flex w-[100%]' />
      <Image  src={Mobileimg} alt="alter" className=' md:hidden w-[100%]' />
    </div>
  );
};

export default HeroSection;
