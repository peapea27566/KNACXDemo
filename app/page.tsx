"use client";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.img
          src="./logo.png"
          alt="Logo"
          className="w-80 md:w-80 lg:w-150 max-w-xs h-auto mb-4 md:mb-0 mx-auto bg-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          style={{ borderRadius: '12px' }} 
        />
        <div className="grid grid-cols gap-4 items-center">
          <motion.h1
            className="text-5xl md:text-8xl font-bold  text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            Welcome
          </motion.h1>

          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            Demo Product (KNACX)
          </motion.h1>


          <motion.h1
            className="text-2xl md:text-3xl font-bold text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            By jirayoos mungplub (Fronend developer)
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
