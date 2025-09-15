import Image from 'next/image';
import React from 'react'
import AnimatedTextCharacter from './AnimatedTextCharacter';

const GlimpsesOfDr = () => {

    const images = [
  "/images/glimpses/1.webp",
  "/images/glimpses/2.webp",
  "/images/glimpses/3.webp",
  "/images/glimpses/4.webp",
  "/images/glimpses/5.webp",
  "/images/glimpses/6.webp",
  "/images/glimpses/7.webp",
  "/images/glimpses/8.webp",
  "/images/glimpses/9.webp",
  "/images/glimpses/10.webp",
  "/images/glimpses/11.webp",
  "/images/glimpses/12.webp",
  "/images/glimpses/13.webp",
  "/images/glimpses/14.webp",
  "/images/glimpses/15.webp",
  "/images/glimpses/16.webp",
  "/images/glimpses/17.webp",
  "/images/glimpses/18.webp",
  "/images/glimpses/19.webp",
  "/images/glimpses/20.webp",
  "/images/glimpses/21.webp",
  "/images/glimpses/22.webp",
  "/images/glimpses/23.webp",
  "/images/glimpses/24.webp",
  "/images/glimpses/25.webp",
  "/images/glimpses/26.webp",
  "/images/glimpses/27.webp",
  "/images/glimpses/28.webp",
  "/images/glimpses/29.webp",
  "/images/glimpses/30.webp",
  "/images/glimpses/31.webp",
  "/images/glimpses/32.webp",
  "/images/glimpses/33.webp",
  "/images/glimpses/34.webp",
  "/images/glimpses/35.webp",
  "/images/glimpses/36.webp",
  "/images/glimpses/37.webp",
  "/images/glimpses/38.webp",
  "/images/glimpses/39.webp",
  "/images/glimpses/40.webp",
  "/images/glimpses/41.webp",
  "/images/glimpses/42.webp",
  "/images/glimpses/43.webp",
  "/images/glimpses/44.webp",
  "/images/glimpses/45.webp",
  "/images/glimpses/46.webp",
  "/images/glimpses/47.webp",
  "/images/glimpses/48.webp",
  "/images/glimpses/49.webp",
  "/images/glimpses/50.webp",
  "/images/glimpses/51.webp",
  "/images/glimpses/52.webp",
  "/images/glimpses/53.webp",
  "/images/glimpses/54.webp",
  "/images/glimpses/55.webp",
  "/images/glimpses/56.webp",
  "/images/glimpses/57.webp",
  "/images/glimpses/58.webp",
  "/images/glimpses/59.webp",
  "/images/glimpses/60.webp",
  "/images/glimpses/61.webp",
  "/images/glimpses/62.webp",
  "/images/glimpses/63.webp",
  "/images/glimpses/64.webp",
  "/images/glimpses/65.webp",
  "/images/glimpses/66.webp",
  "/images/glimpses/67.webp",
  "/images/glimpses/68.webp",
  "/images/glimpses/69.webp",
  "/images/glimpses/70.webp",
  "/images/glimpses/71.webp",
  "/images/glimpses/72.webp",
  "/images/glimpses/73.webp",
  "/images/glimpses/74.webp",
  "/images/glimpses/75.webp",
  "/images/glimpses/76.webp",
  "/images/glimpses/77.webp",
  "/images/glimpses/78.webp",
  "/images/glimpses/79.webp",
  "/images/glimpses/80.webp",
  "/images/glimpses/81.webp",
  "/images/glimpses/82.webp",
  "/images/glimpses/83.webp",
  "/images/glimpses/84.webp",
  "/images/glimpses/85.webp",
  "/images/glimpses/86.webp",
  "/images/glimpses/87.webp",
  "/images/glimpses/88.webp",
  "/images/glimpses/89.webp",
  "/images/glimpses/90.webp",
];
  return (
  <div className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-helvetica text-center font-medium leading-none text-[32px] lg:text-[44px] pb-14">
          <AnimatedTextCharacter text="Glimpses Of Dr.Ramdas Pai" />
        </h2>

           <div className="w-full max-w-7xl xl:max-w-9xl  mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative w-full xl:h-[70vh] lg2:h-[70vh] md:h-[65vh] h-[60vh] overflow-hidden rounded-lg shadow-md">
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