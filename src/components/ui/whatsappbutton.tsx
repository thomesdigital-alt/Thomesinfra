"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const phoneNumber = "919032939753"; // +91 90329 39753
  const message = encodeURIComponent("Hello! I'm interested in your projects.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-xl shadow-lg">
              Chat with us!
              {/* Arrow */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-xl flex items-center justify-center transition-colors"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.002 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.629 4.653 1.823 6.669L2.667 29.333l6.864-1.797A13.267 13.267 0 0 0 16.002 29.333C23.362 29.333 29.333 23.362 29.333 16c0-7.362-5.971-13.333-13.331-13.333Zm0 24.267a11.06 11.06 0 0 1-5.637-1.543l-.404-.24-4.073 1.067 1.086-3.965-.265-.419A11.036 11.036 0 0 1 4.934 16c0-6.108 4.96-11.067 11.068-11.067S27.067 9.892 27.067 16s-4.958 11.067-11.065 11.067Zm6.07-8.282c-.333-.167-1.969-.972-2.274-1.082-.304-.111-.525-.167-.746.167-.22.333-.857 1.082-1.05 1.303-.194.222-.388.25-.721.083-.333-.167-1.405-.518-2.676-1.651-.99-.882-1.658-1.971-1.852-2.304-.194-.333-.021-.513.146-.679.15-.149.333-.389.5-.583.167-.194.222-.333.333-.555.111-.222.056-.417-.028-.583-.083-.167-.746-1.799-1.022-2.464-.269-.647-.543-.559-.746-.569l-.636-.011c-.222 0-.583.083-.889.417-.305.333-1.163 1.137-1.163 2.771s1.19 3.213 1.357 3.436c.167.222 2.342 3.578 5.676 5.018.793.342 1.412.547 1.894.7.796.253 1.52.218 2.093.132.638-.095 1.969-.805 2.247-1.582.278-.777.278-1.443.195-1.582-.083-.139-.305-.222-.638-.389Z" />
        </svg>
      </motion.div>
    </a>
  );
}