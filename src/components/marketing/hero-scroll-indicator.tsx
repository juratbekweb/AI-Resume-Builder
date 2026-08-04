"use client";

import * as React from "react";
import { motion } from "motion/react";

export function HeroScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hidden md:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-widest text-foreground-secondary font-medium">Scroll to explore</span>
      <div className="w-[1px] h-12 bg-border relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          animate={{
            y: ['-100%', '200%']
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
}
