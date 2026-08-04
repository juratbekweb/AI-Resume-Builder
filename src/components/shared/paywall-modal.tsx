import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Sparkles, X, CheckCircle, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl pointer-events-auto relative"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 text-cyan-400 mx-auto">
                  <Lock className="h-7 w-7" />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {t.usageLimitTitle}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                    {t.usageLimitDesc}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    href="/#pricing"
                    onClick={onClose}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
                  >
                    <Zap className="h-4 w-4" />
                    {t.upgradeNow}
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full rounded-xl border border-white/10 py-3.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {t.closeBtn}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-slate-400">Pro - {t.pricePro}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400" />
                    <span className="text-xs text-slate-400">Premium - {t.pricePremium}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
