import Image from 'next/image'
import React from 'react'
import img from "../../public/images/hero.webp"
const HeroSection = () => {
  return (
    <div className='h-auto overflow-x-hidden'>
      <Image  src={img} alt="alter" className='' />
    </div>
  )
}

export default HeroSection
