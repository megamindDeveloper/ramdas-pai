"use client";
import React, { useEffect, useState } from "react";
import AnimatedTextCharacter from "./AnimatedTextCharacter";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

function Book() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      <div className="relative">
        <section className="mx-auto lg:max-w-7xl pt-10 pb-20 px-5 lg:px-0">
          <h2  style={{ color: '#EF4123' }} className="text-[32px] leading-[1.1] font-sans sm:text-3xl md:text-3xl lg:text-[44px] font-semibold text-[#FF2400] mb-6 md:mb-8">
          A Journey of <br/>  Vision & Leadership
          </h2>
          <p className="text-lg text-black font-sans lg:max-w-xl mx-auto md:mx-0">
          This flipbook honours Dr. Ramdas M Pai and his invaluable contributions, highlighting remarkable milestones through archival photographs and heartfelt reflections that showcase his passion, vision, and dedication to building the modern Manipal.
          </p>
          <div className="hidden lg:block relative">
            <div className="flex relative flex-col lg:flex-row gap-6 mt-12">
              <div className="w-[70%]">
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/3.png"
                  alt="Book Cover 1"
                  className="w-full h-full object-cover shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/4.png"
                  alt="Book Cover 2"
                  className="w-full h-full object-cover shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
          </div>
          <div className="relative lg:hidden">
            <div className="flex relative flex-col lg:flex-row gap-6 mt-12">
              <div className="">
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/3.png"
                  alt="Book Cover 1"
                  className="w-full h-[40vh] object-cover shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Image
                  loading="lazy"
                  width={1000}
                  height={1000}
                  src="/images/flipImage/4.png"
                  alt="Book Cover 2"
                  className="w-full h-[40vh] object-cover shadow-xl cursor-pointer  transition"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
          </div>
          <div className="absolute hidden lg:block -z-10 -bottom-20 -right-[400px] xl:-right-[300px]">
            <Image
              src="/images/flipImage/6.png"
              alt="Overlay"
              width={1000}
              height={1000}
              className="object-cover  cursor-pointer  "
              onClick={() => setOpen(true)}
            />
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl  shadow-2xl w-[90vw] h-[90vh] max-w-[1200px] max-h-[800px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Close Button */}
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white bg-black p-2 rounded-full ">
                <IconX size={25} />
              </button>

              {/* Heyzine Flipbook Embed */}
              <iframe src="https://heyzine.com/flip-book/fc13ba6b09.html" className="w-full h-full rounded-lg" frameBorder="0" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Book;
