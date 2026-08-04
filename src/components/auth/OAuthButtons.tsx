"use client";

import { motion } from "motion/react";

type OAuthButtonsProps = {
  onProviderClick: (provider: string) => void;
};

const providers = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
];

export function OAuthButtons({ onProviderClick }: OAuthButtonsProps) {
  return (
    <div className="space-y-3">
      {providers.map((provider, index) => (
        <motion.button
          key={provider.id}
          type="button"
          onClick={() => onProviderClick(provider.id)}
          className="premium-button flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-medium text-white transition-all hover:border-cyan-400/30 hover:bg-slate-900/60 hover:scale-[1.02]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="h-5 w-5 rounded-full border border-white/20" aria-hidden />
          {provider.label}
        </motion.button>
      ))}
    </div>
  );
}
