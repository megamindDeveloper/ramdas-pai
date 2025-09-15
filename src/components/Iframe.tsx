"use client"
import React, { useState } from "react"
import AnimatedTextCharacter from "./AnimatedTextCharacter"
import { motion, AnimatePresence } from "framer-motion"
import { IconX } from "@tabler/icons-react"

function Book() {
  const [open, setOpen] = useState(false)

  return (
    <> 
      <section className="container mx-auto py-20 px-5 lg:px-0">
        <h2 className="font-helvetica text-center hidden lg:block font-medium leading-none text-[32px] lg:text-[64px]">
          <AnimatedTextCharacter text="A Journey of Vision & Leadership" />
        </h2>
        <h2 className="font-helvetica lg:hidden text-center mb-3 font-medium leading-none text-[32px] lg:text-[64px]">
          <AnimatedTextCharacter text="A Journey of " />
        </h2>
        <h2 className="font-helvetica text-center lg:hidden font-medium leading-none text-[32px] lg:text-[64px]">
          <AnimatedTextCharacter text="Vision & Leadership" />
        </h2>

        {/* Closed Books Display */}
        <div className="flex flex-col lg:flex-row lg:justify-evenly gap-12 mt-12">
          <img
            src="/images/flipImage/3.png"
            alt="Book Cover 1"
            className="w-96 h-72 object-cover shadow-xl cursor-pointer hover:scale-105 transition"
            onClick={() => setOpen(true)}
          />
          <img
            src="/images/flipImage/3.png"
            alt="Book Cover 2"
            className="w-96 h-72 object-cover shadow-xl cursor-pointer hover:scale-105 transition"
            onClick={() => setOpen(true)}
          />
        </div>

        <p className="text-black font-helvetica text-center px-10 mt-12 text-lg">
          This flipbook honours Dr. Ramdas M Pai and his invaluable contributions,
          highlighting remarkable milestones through archival photographs and
          heartfelt reflections that showcase his passion, vision, and dedication
          to building the modern Manipal.
        </p>
      </section>

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
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white bg-black p-2 rounded-full "
              >
                <IconX size={25} />
              </button>

              {/* Heyzine Flipbook Embed */}
              <iframe
                src="https://heyzine.com/flip-book/fc13ba6b09.html"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Book
