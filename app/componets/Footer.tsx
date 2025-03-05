"use client"
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="shadow-lg  bg-white/10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="text-center text-sm py-4">
        © {new Date().getFullYear()} Cart emo. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
