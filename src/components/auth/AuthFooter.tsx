"use client";

import * as React from "react";
import { motion } from "motion/react";

type AuthFooterProps = {
  prompt: string;
  linkHref: string;
  linkLabel: string;
};

export function AuthFooter({ prompt, linkHref, linkLabel }: AuthFooterProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center text-sm text-slate-400"
    >
      {prompt}{" "}
      <a href={linkHref} className="font-medium text-cyan-300 transition hover:text-cyan-200">
        {linkLabel}
      </a>
    </motion.p>
  );
}
