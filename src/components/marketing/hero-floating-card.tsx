"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroFloatingCardProps {
  text: string;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export function HeroFloatingCard({ text, className, delay = 0, yOffset = 15, duration = 4 }: HeroFloatingCardProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full border border-border/50 bg-surface/90 backdrop-blur-md px-4 py-2 shadow-xl flex items-center gap-2 z-20",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -yOffset, 0] 
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5, type: "spring", bounce: 0.4 },
        y: { 
          delay: delay, 
          duration, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
    >
      <svg className="w-4 h-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{text}</span>
    </motion.div>
  );
}
