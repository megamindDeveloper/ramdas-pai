import Image from 'next/image';
import React from 'react'
import AnimatedTextCharacter from './AnimatedTextCharacter';

const GlimpsesOfDr = () => {

    const images = [
  "/images/glimpses/1.jpg",
  "/images/glimpses/2.jpg",
  "/images/glimpses/3.jpg",
  "/images/glimpses/4.jpg",
  "/images/glimpses/5.jpg",
  "/images/glimpses/6.jpg",
  "/images/glimpses/7.jpg",
  "/images/glimpses/8.jpg",
  "/images/glimpses/9.jpg",
  "/images/glimpses/10.jpg",
  "/images/glimpses/11.jpg",
  "/images/glimpses/12.jpg",
  "/images/glimpses/13.jpg",
  "/images/glimpses/14.jpg",
  "/images/glimpses/15.jpg",
  "/images/glimpses/16.jpg",
  "/images/glimpses/17.jpg",
  "/images/glimpses/18.jpg",
  "/images/glimpses/19.jpg",
  "/images/glimpses/20.jpg",
  "/images/glimpses/21.jpg",
  "/images/glimpses/22.jpg",
  "/images/glimpses/23.jpg",
  "/images/glimpses/24.jpg",
  "/images/glimpses/25.jpg",
  "/images/glimpses/26.jpg",
  "/images/glimpses/27.jpg",
  "/images/glimpses/28.jpg",
  "/images/glimpses/29.jpg",
  "/images/glimpses/30.jpg",
  "/images/glimpses/31.jpg",
  "/images/glimpses/32.jpg",
  "/images/glimpses/33.jpg",
  "/images/glimpses/34.jpg",
  "/images/glimpses/35.jpg",
  "/images/glimpses/36.jpg",
  "/images/glimpses/37.jpg",
  "/images/glimpses/38.jpg",
  "/images/glimpses/39.jpg",
  "/images/glimpses/40.jpg",
  "/images/glimpses/41.jpg",
  "/images/glimpses/42.jpg",
  "/images/glimpses/43.jpg",
  "/images/glimpses/44.jpg",
  "/images/glimpses/45.jpg",
  "/images/glimpses/46.jpg",
  "/images/glimpses/47.jpg",
  "/images/glimpses/48.jpg",
  "/images/glimpses/49.jpg",
  "/images/glimpses/50.jpg",
  "/images/glimpses/51.jpg",
  "/images/glimpses/52.jpg",
  "/images/glimpses/53.jpg",
  "/images/glimpses/54.jpg",
  "/images/glimpses/55.jpg",
  "/images/glimpses/56.jpg",
  "/images/glimpses/57.jpg",
  "/images/glimpses/58.jpg",
  "/images/glimpses/59.jpg",
  "/images/glimpses/60.jpg",
  "/images/glimpses/61.jpg",
  "/images/glimpses/62.jpg",
  "/images/glimpses/63.jpg",
  "/images/glimpses/64.jpg",
  "/images/glimpses/65.jpg",
  "/images/glimpses/66.jpg",
  "/images/glimpses/67.jpg",
  "/images/glimpses/68.jpg",
  "/images/glimpses/69.jpg",
  "/images/glimpses/70.jpg",
  "/images/glimpses/71.jpg",
  "/images/glimpses/72.jpg",
  "/images/glimpses/73.jpg",
  "/images/glimpses/74.jpg",
  "/images/glimpses/75.jpg",
  "/images/glimpses/76.jpg",
  "/images/glimpses/77.jpg",
  "/images/glimpses/78.jpg",
  "/images/glimpses/79.jpg",
  "/images/glimpses/80.jpg",
  "/images/glimpses/81.jpg",
  "/images/glimpses/82.jpg",
  "/images/glimpses/83.jpg",
  "/images/glimpses/84.jpg",
  "/images/glimpses/85.jpg",
  "/images/glimpses/86.png",
  "/images/glimpses/87.jpg",
  "/images/glimpses/88.jpg",
  "/images/glimpses/89.jpg",
  "/images/glimpses/90.jpg",
];
  return (
  <div className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-helvetica text-center font-medium leading-none text-[32px] lg:text-[44px] pb-14">
          <AnimatedTextCharacter text="Glimpses Of Dr.Ramdas Pai" />
        </h2>

           <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md">
            <Image
              src={src}
              alt={`Glimpse ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
        {/* <div className="flex justify-center mt-10">
        <Link href="/greetings">
          <button className="uppercase border-[2px] border-[#F26C21] text-[#F26C21] px-8 py-3 font-helvetica font-bold">View more</button>
        </Link>
      </div> */}

    
      </div>  )
}

export default GlimpsesOfDr