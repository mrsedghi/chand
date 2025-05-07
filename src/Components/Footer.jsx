/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className=" footer footer-center p-6 sm:p-8  text-base-content border-t border-base-200/50 overflow-hidden">
      {/* Animated Waves Background */}

      {/* Creator Info */}
      <motion.div
        dir="rtl"
        className="relative z-10 flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base bg-base-100/80 px-4 py-2 sm:px-5 sm:py-3 rounded-full backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span>ساخته شده با</span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Icon icon="mdi:heart" className="text-red-600" />
        </motion.span>

        <span>توسط</span>
        <a
          href="https://mrsedghi.ir"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:text-secondary transition-colors"
        >
          MRSedghi
        </a>
      </motion.div>
    </footer>
  );
};

export default Footer;
