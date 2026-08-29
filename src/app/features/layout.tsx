'use client';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/providers/language-provider';

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Top bar */}
      <div className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-20 z-40">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            {t.backToHome}
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t.DocNovaFeatures}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
