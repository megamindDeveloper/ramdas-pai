
import Image from 'next/image'
import React from 'react'
import img from "../../public/images/backgroundImage/banner.webp"
import Mobileimg from "../../public/images/backgroundImage/mobile.png"

const HeroSection = () => {
  return (
    <div className='h-auto overflow-x-hidden'>
         <Image  src={img} alt="alter" className='hidden md:flex w-[100%]' />
      <div className='relative'>
   
      <Image  src={Mobileimg} alt="alter" className=' md:hidden w-[100%]' />
      <div className='md:hidden  absolute text-[#000000] top-0  space-y-2 left-0 p-5'>
      <h1 className='text-[34px]'>90 and forever</h1>
      <p className='text-base'>Wish you, the <span className='font-bold'>architect of moden Manipal-</span> a doyen of education and healthcare in india, a very happy birthyday </p>
      <p className='text-base'><span className='font-bold'>Dr.Ramdas M pai</span>, Padma Bhushan Awardee Chancellor,Manipal Academy of Higher Education(MAHE)</p>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
