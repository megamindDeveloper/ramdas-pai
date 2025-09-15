import React from "react";
import Image from "next/image";
import src from "../../public/images/Doyen.png";

const DoyenSection = () => {
  return (
    <section className="text-black py-16 md:py-20 lg:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content Area */}

        <div className="text-center md:text-left">
          <h2 className="text-[32px] leading-[1.1] font-helvetica sm:text-3xl md:text-5xl lg:text-6xl font-medium text-black mb-6 md:mb-8">
            Doyen of Medical Healthcare & Education
          </h2>
          <div className=" mb-6 lg:hidden justify-center md:justify-end">
            <div className="relative w-full max-w-md md:max-w-lg aspect-[16/9]">
              <Image
              loading="lazy"
                src={src}
                alt="Dr. Ramdas M. Pai, Doyen of Medical & Healthcare Education"
                fill
                className="rounded-lg  object-cover"
               
              />
            </div>
          </div>
          <p className="text-lg text-black font-helvetica max-w-xl mx-auto md:mx-0">
            Dr. Pai championed the foundational principle of education as a right, not a privilege. He decisively contributed significantly to the
            landmark Supreme Court judgment in 2002 affirming the autonomy of private professional institutions. Under his leadership, MAHE became a
            premier deemed university in 1993 and expanded globally, establishing educational and healthcare campuses in Malaysia, Nepal, Antigua.
          </p>
        </div>

        {/* Right Image Area */}
        {/* Right Image Area */}
        <div className="hidden lg:flex justify-center md:justify-end">
          <div className="relative w-full  h-[400px]">
            <Image
              src={src}
              alt="Dr. Ramdas M. Pai, Doyen of Medical & Healthcare Education"
              fill
              className="rounded-lg shadow-2xl object-cover"
             loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoyenSection;
