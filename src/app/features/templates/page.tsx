'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutTemplate, X, Check, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { useRouter } from 'next/navigation';

const categories = ['All', 'Tech', 'Creative', 'Executive', 'Startup', 'Academic'];

const templates = [
  { id: 1, name: 'Modern Executive', category: 'Executive', accent: 'from-primary to-blue-600', bg: 'from-primary/10 to-blue-500/5', border: 'border-primary/20', preview: 'Clean hierarchy, serif headings, subtle dividers. Perfect for C-suite and leadership roles where gravitas matters.', features: ['2-column layout', 'Executive summary box', 'Board-ready format'] },
  { id: 2, name: 'Product Designer', category: 'Creative', accent: 'from-fuchsia-500 to-violet-600', bg: 'from-fuchsia-500/10 to-violet-500/5', border: 'border-fuchsia-400/20', preview: 'Bold typography, portfolio-friendly layout with space for project highlights. Built for creative professionals.', features: ['Portfolio section', 'Visual skill bars', 'Project showcase'] },
  { id: 3, name: 'Startup Operator', category: 'Startup', accent: 'from-emerald-500 to-teal-600', bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-400/20', preview: 'Fast, punchy, metric-heavy layout designed for growth-stage companies that move quickly and value impact.', features: ['Metrics-first design', 'Compact density', 'Startup keywords'] },
  { id: 4, name: 'Tech Engineer', category: 'Tech', accent: 'from-blue-500 to-indigo-600', bg: 'from-blue-500/10 to-indigo-500/5', border: 'border-blue-400/20', preview: 'ATS-optimized monospace accents, skills matrix, and GitHub/portfolio links built in for engineering roles.', features: ['Skills matrix', 'GitHub integration', 'ATS-first design'] },
  { id: 5, name: 'Academic Researcher', category: 'Academic', accent: 'from-amber-500 to-orange-600', bg: 'from-amber-500/10 to-orange-500/5', border: 'border-amber-400/20', preview: 'Publication-ready CV format with sections for research interests, teaching experience, and academic honors.', features: ['Publications section', 'Research interests', 'CV format'] },
  { id: 6, name: 'All-Rounder Pro', category: 'Tech', accent: 'from-rose-500 to-pink-600', bg: 'from-rose-500/10 to-pink-500/5', border: 'border-rose-400/20', preview: 'Versatile, balanced layout that works for any industry. Clean, professional, and recruiter-tested.', features: ['Universal format', 'Recruiter-tested', 'Any industry'] },
];

export default function TemplatesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const [used, setUsed] = useState<number | null>(null);

  const router = useRouter();

  const filtered = filter === 'All' ? templates : templates.filter(tpl => tpl.category === filter);
  const modal = templates.find(tpl => tpl.id === selected);

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" /></div>
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-400/30">
              <LayoutTemplate className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-pink-400">{t.templatesFeature}</div>
              <h1 className="text-2xl font-bold text-foreground">{t.templatesTitle}</h1>
            </div>
          </div>
          <p className="text-foreground-secondary max-w-2xl">{t.templatesDesc}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                filter === cat ? 'border-pink-400/60 bg-pink-400/15 text-pink-300' : 'border-border bg-surface text-foreground-secondary hover:border-white/20 hover:text-foreground'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border ${tpl.border} bg-gradient-to-br ${tpl.bg} p-6 cursor-pointer transition-all hover:-translate-y-1`}
                onClick={() => setSelected(tpl.id)}
              >
                <div className={`mb-4 h-32 rounded-xl bg-gradient-to-br ${tpl.accent} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{tpl.name}</h3>
                    <span className="text-xs text-foreground-secondary">{tpl.category}</span>
                  </div>
                  {used === tpl.id && <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-400"><Check className="h-3 w-3" />Active</span>}
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={e => { e.stopPropagation(); setSelected(tpl.id); }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-slate-300 hover:border-white/20 hover:text-foreground transition-colors">
                    <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {t.preview}</span>
                  </button>
                  <button onClick={e => { 
                    e.stopPropagation(); 
                    setUsed(tpl.id);
                    setTimeout(() => router.push('/features/preview'), 600);
                  }}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all bg-gradient-to-r ${tpl.accent} text-foreground hover:opacity-90`}>
                    <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> {used === tpl.id ? t.selected : t.useThis}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg rounded-2xl border ${modal.border} bg-surface-elevated p-8`}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-lg border border-border p-1.5 text-foreground-secondary hover:text-foreground"><X className="h-4 w-4" /></button>
              <div className={`mb-6 h-40 rounded-xl bg-gradient-to-br ${modal.accent} opacity-25`} />
              <h2 className="text-xl font-bold text-foreground mb-1">{modal.name}</h2>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-secondary">{modal.category}</span>
              <p className="mt-4 text-sm text-slate-300 leading-7">{modal.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {modal.features.map(f => <span key={f} className="flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1 text-xs text-slate-300"><Check className="h-3 w-3 text-emerald-400" />{f}</span>)}
              </div>
              <button onClick={() => { 
                setUsed(modal.id); 
                setTimeout(() => router.push('/features/preview'), 600);
              }}
                className={`mt-6 w-full rounded-xl bg-gradient-to-r ${modal.accent} py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-opacity`}>
                {used === modal.id ? t.templateSelected : t.useThis}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
