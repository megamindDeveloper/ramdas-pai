"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedTextCharacter = ({ text }: { text: string }) => {
  // Reference to the container
  const ref = useRef(null);
  const ref2 = useRef(null);

  // Trigger animation when the element is in view
  const isInView = useInView(ref, { once: true });
  const isInView2 = useInView(ref2, { once: true });

  // Splitting text into letters
  const letters = Array.from(text);

  // Variants for Container
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
        className="hidden sm:block"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <span
        ref={ref2}
        className={`sm:hidden ${isInView2 ? "text-slide-in" : ""}`}
      >
        {text}
      </span>
    </>
  );
};

export default AnimatedTextCharacter;
