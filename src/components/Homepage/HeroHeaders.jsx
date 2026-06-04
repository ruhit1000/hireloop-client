"use client";
import React from "react";
import { motion } from "motion/react";

const HeroHeaders = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold text-white mt-8 text-center tracking-tight"
      >
        Find Your Dream Job Today
      </motion.h1>
      <motion.p
        className="text-neutral-400 mt-5 text-center max-w-2xl text-lg"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.015 } }, // 0.015s per character for full speed
          hidden: {},
        }}
      >
        {"HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster."
          .split("")
          .map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { display: "none", opacity: 0 },
                visible: { display: "inline", opacity: 1 },
              }}
            >
              {char}
            </motion.span>
          ))}
      </motion.p>
    </div>
  );
};

export default HeroHeaders;
