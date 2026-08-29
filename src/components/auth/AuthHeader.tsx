"use client";

import * as React from "react";
import { motion } from "motion/react";

import { FileText } from "lucide-react";

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20"
      >
        <FileText className="h-8 w-8 text-primary-foreground" />
      </motion.div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
      {subtitle ? <p className="mt-3 text-sm text-foreground-secondary">{subtitle}</p> : null}
    </motion.div>
  );
}
