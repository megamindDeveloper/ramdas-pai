"use client"
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const toastVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3 } },
};

interface CustomToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, visible, onClose }) => {
  // Auto close after 3s
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);


  
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <div> <motion.div
          key="custom-toast"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed w-full  md:hidden flex justify-center items-center  z-[9999]"
        >
          <div className="relative font-sans bg-white text-[#4a2e20] p-6 rounded-lg border-2 border-[#a98e71] shadow-2xl flex flex-col items-center justify-center text-center max-w-sm">
            <div className="absolute inset-1 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

            {/* Toast image */}
            <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <Image width={150} height={150} src="/images/backgroundImage/popupImage.webp" alt="Toast Icon" className="w-24 h-auto mb-4" />
            </motion.div>

            {/* Toast message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-md font-semibold leading-relaxed text-gray-800"
            >
              {message}
            </motion.p>

            {/* Decorations */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-2 left-2 text-xl text-[#002c5a] rotate-6"
            >
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute bottom-2 right-2 text-xl text-[#9a2a3c] -rotate-6"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          key="custom-toast"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]"
        >
          <div className="relative font-sans bg-white text-[#4a2e20] p-6 rounded-lg border-2 border-[#a98e71] shadow-2xl flex flex-col items-center justify-center text-center max-w-sm">
            <div className="absolute inset-1 border border-[#a98e71]/80 rounded-md pointer-events-none"></div>

            {/* Toast image */}
            <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <Image width={150} height={150} src="/images/backgroundImage/popupImage.webp" alt="Toast Icon" className="w-24 h-auto mb-4" />
            </motion.div>

            {/* Toast message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-md font-semibold leading-relaxed text-gray-800"
            >
              {message}
            </motion.p>

            {/* Decorations */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-2 left-2 text-xl text-[#002c5a] rotate-6"
            >
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute bottom-2 right-2 text-xl text-[#9a2a3c] -rotate-6"
            >
              ✦
            </motion.div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CustomToast