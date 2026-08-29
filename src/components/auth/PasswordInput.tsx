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
      <label htmlFor={id} className="block text-sm font-medium text-foreground-secondary">
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
          className={`w-full rounded-xl border bg-surface px-4 py-3 pr-12 text-sm text-foreground transition placeholder:text-foreground-secondary/50 focus:ring-1 focus:outline-none ${
            error
              ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/40"
              : "border-border focus:border-primary focus:ring-primary/40"
          }`}
        />
        <motion.button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-3 inline-flex items-center text-xs font-medium text-foreground-secondary transition hover:text-foreground"
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
          className="text-xs text-red-400"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
