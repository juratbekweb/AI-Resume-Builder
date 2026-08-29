"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="flex flex-col items-start gap-6 max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Badge variant="outline" className="px-4 py-1.5 text-sm border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          AI Document Platform
        </Badge>
      </motion.div>

      <motion.h1 
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]"
      >
        Build Your Dream Career with{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          AI-Powered
        </span>{" "}
        Resumes
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="text-lg text-foreground-secondary leading-relaxed max-w-xl"
      >
        Transform your career story into a stunning, ATS-optimized resume. DocNova leverages advanced AI to create recruiter-winning resumes in minutes, not hours.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
        <Link href="/register" tabIndex={-1}>
          <Button 
            size="lg" 
            className="h-14 px-8 font-semibold text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all premium-button"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Building Free
          </Button>
        </Link>
        <Link href="/#templates" tabIndex={-1}>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 px-8 font-semibold text-base border-cyan-400/30 hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:scale-105 transition-all"
          >
            View Templates
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mt-4 text-sm font-medium text-foreground-secondary">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Free forever plan</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>ATS Friendly</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
