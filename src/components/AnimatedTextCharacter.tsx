"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { style } from "framer-motion/client";


// Define the component's props to include an optional className
type AnimatedTextCharacterProps = {
  text: string;
  className?: string; // Optional className prop
};


const AnimatedTextCharacter = ({ text, className }: AnimatedTextCharacterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const letters = Array.from(text);

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`hidden sm:block   ${style} `}
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <span
        ref={ref2}
        className={`sm:hidden ${style}  ${isInView2 ? "text-slide-in" : ""}`}
      >
        {text}
      </span>
    </>

  );
};

export default AnimatedTextCharacter;