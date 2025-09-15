import Image from 'next/image'
import React from 'react'
import img from "../../public/images/backgroundImage/Web_banner_1440x400.webp"
const HeroSection = () => {
  return (
    <div className='h-auto overflow-x-hidden'>
      <Image  src={img} alt="alter" className='' />
    </div>
  )
}

export default HeroSection
