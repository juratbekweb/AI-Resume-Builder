"use client";

import { motion } from "motion/react";

type RememberMeProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function RememberMe({ checked, onChange }: RememberMeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <div className="relative">
        <input
          id="rememberMe"
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <motion.div
          animate={{ 
            backgroundColor: checked ? "#22D3EE" : "rgba(255, 255, 255, 0.1)",
            borderColor: checked ? "#22D3EE" : "rgba(255, 255, 255, 0.2)"
          }}
          className="h-4 w-4 rounded border flex items-center justify-center"
        >
          <motion.svg
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-950"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </motion.div>
      </div>
      <label htmlFor="rememberMe" className="text-sm text-slate-300 cursor-pointer">
        Remember me
      </label>
    </motion.div>
  );
}
