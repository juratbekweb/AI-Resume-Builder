"use client";

import { useState } from "react";
import { motion } from "motion/react";

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 pr-12 text-sm text-white transition placeholder:text-slate-500 focus:ring-2 focus:outline-none ${
            error
              ? "border-red-400/80 focus:border-red-300 focus:ring-red-500/40"
              : "border-white/10 focus:border-cyan-400/80 focus:ring-cyan-500/40"
          }`}
        />
        <motion.button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-3 inline-flex items-center text-xs font-medium text-slate-400 transition hover:text-white"
          whileTap={{ scale: 0.95 }}
        >
          {visible ? "Hide" : "Show"}
        </motion.button>
      </div>
      {error ? (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-300"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
