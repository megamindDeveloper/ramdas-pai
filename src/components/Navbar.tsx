import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[100vh] relative'>
      <header className="flex justify-between py-6 mx-auto container relative z-[99999] ">
        <Image src={"/images/logo.svg"} className="" alt="logo" width={239} height={63} />
        <Image src={"/images/latestHeader.svg"} alt="logo" width={320} height={48} className="hidden lg:block object-contain" />
      </header>
    </div>
  )
}

export default Navbar
