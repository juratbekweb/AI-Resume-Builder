"use client";

import { motion } from "motion/react";

type PasswordStrengthProps = {
  password: string;
};

type Strength = {
  label: string;
  color: string;
  width: string;
};

const getStrength = (password: string): Strength => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
      return { label: "Weak", color: "bg-red-500", width: "20%" };
    case 2:
      return { label: "Fair", color: "bg-orange-500", width: "40%" };
    case 3:
      return { label: "Good", color: "bg-yellow-500", width: "60%" };
    case 4:
      return { label: "Strong", color: "bg-emerald-500", width: "80%" };
    default:
      return { label: "Very strong", color: "bg-emerald-400", width: "100%" };
  }
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const { label, color, width } = getStrength(password);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-1.5"
    >
      <div className="h-1.5 w-full rounded-full bg-white/10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${color}`}
          style={{ width }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-slate-400"
      >
        Password strength: <span className="text-white font-medium">{label}</span>
      </motion.p>
    </motion.div>
  );
}
