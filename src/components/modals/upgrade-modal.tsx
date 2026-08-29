"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-surface border border-primary/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-primary/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-elevated text-foreground-secondary hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Limit Reached</h2>
                <p className="text-sm text-foreground-secondary">
                  You've reached your daily limit for free AI requests. Upgrade to PRO for unlimited access.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  "Unlimited AI Generations",
                  "Advanced CV Analytics",
                  "Priority Support",
                  "Premium Templates"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-emerald-500" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Link href="/pricing" className="block w-full" onClick={onClose}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)]">
                  View PRO Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <button 
                onClick={onClose}
                className="w-full mt-4 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
