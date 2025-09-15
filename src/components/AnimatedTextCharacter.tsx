"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
    },
  };

  return (
    // 1. Use a single wrapper with the ref to trigger both animations
    // 2. Pass the external className to this wrapper
    <div ref={ref} className={className}>
      {/* Desktop version with character stagger */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="hidden sm:block"
        aria-label={text} // Add aria-label for accessibility
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Mobile version with a simple fade-in */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="block sm:hidden" // Use 'block' to ensure it's visible
        aria-hidden="true" // Hide from screen readers as the parent has the label
      >
        {text}
      </motion.span>
    </div>
  );
};

export default AnimatedTextCharacter;