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
      className="mt-6 text-center text-sm text-foreground-secondary"
    >
      {prompt}{" "}
      <a href={linkHref} className="font-semibold text-primary transition hover:text-primary/80">
        {linkLabel}
      </a>
    </motion.p>
  );
}
