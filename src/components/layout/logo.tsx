"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({ className, iconClassName, textClassName, showText = true, ...props }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg", className)}
      aria-label="DocNova Home"
      {...props}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          
          {/* Logo container */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("text-primary-foreground", iconClassName)}
              aria-hidden="true"
            >
              {/* Document body with folded corner */}
              <path
                d="M7 4.5C7 3.67 7.67 3 8.5 3H17L22 8V23.5C22 24.33 21.33 25 20.5 25H8.5C7.67 25 7 24.33 7 23.5V4.5Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Folded corner */}
              <path
                d="M17 3V7C17 7.55 17.45 8 18 8H22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Text lines */}
              <line x1="10.5" y1="12.5" x2="18.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10.5" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10.5" y1="19.5" x2="14" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* AI spark */}
              <path
                d="M21 13L22 11L23 13L25 14L23 15L22 17L21 15L19 14L21 13Z"
                fill="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors", textClassName)}>
            DocNova
          </span>
          {props['aria-label'] === 'DocNova Home' && (
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase">
              AI Tools Hub
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
