// src/components/DoyenSection.jsx

import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js for Image component
import src from '../../public/images/Doyen.png'
const DoyenSection = () => {
  return (
    <section className=" text-black py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content Area */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Doyen of Medical & Healthcare Education
          </h2>
          <p className="text-lg text-black max-w-xl mx-auto md:mx-0">
            Dr. Pai championed the foundational principle of education as a right, not a
            privilege. He decisively contributed significantly to the landmark Supreme Court
            judgment in 2002 affirming the autonomy of private professional institutions.
            Under his leadership, MAHE became a premier deemed university in 1993 and
            expanded globally, establishing educational and healthcare campuses in
            Malaysia, Nepal, Antigua.
          </p>
        </div>

        {/* Right Image Area */}
        <div className="flex justify-center md:justify-end h-full">
          <div className="relative w-full max-w-md h-full md:max-w-lg aspect-w-16 aspect-h-9 sm:aspect-h-10 md:aspect-h-8 lg:aspect-h-9 xl:aspect-h-10">
            {/* The Image component itself */}
            <Image
              src={src}
              fill // IMPORTANT: Update this path to your image
              alt="Dr. Ramdas M. Pai, Doyen of Medical & Healthcare Education"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl h-auto"
              priority // Use priority if this image is above the fold
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoyenSection;