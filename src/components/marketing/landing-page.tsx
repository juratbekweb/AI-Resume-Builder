"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Reorder } from "motion/react";
import {
  Sparkles,
  Star,
  Brain,
  ShieldCheck,
  Download,
  Eye,
  LayoutTemplate,
  GitBranch,
  CheckCircle,
  TrendingUp,
  Users,
  ArrowRight,
  ChevronDown,
  Zap,
  GripVertical,
} from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  glowColor: string;
  badge: string;
  badgeColor: string;
  stat: string;
  statLabel: string;
  href: string;
};

type Template = {
  name: string;
  description: string;
  accent: string;
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GoPay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "GoPay is an AI-powered resume builder that helps professionals create ATS-ready resumes with guided support and polished templates.",
  url: "https://gopay.example.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-overlay" />
    
    <motion.div
      animate={{
        x: [0, 100, 0, -100, 0],
        y: [0, 50, 100, 50, 0],
        scale: [1, 1.2, 1, 0.8, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]"
    />
    
    <motion.div
      animate={{
        x: [0, -150, 0, 150, 0],
        y: [0, -100, 50, -50, 0],
        scale: [1, 1.5, 1, 1.2, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[150px]"
    />

    <motion.div
      animate={{
        x: [0, 50, -50, 50, 0],
        y: [0, 150, 0, -150, 0],
        scale: [1, 1.1, 0.9, 1.1, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"
    />
  </div>
);

const FaqItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-1 overflow-hidden transition-colors hover:border-cyan-400/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 font-semibold text-white transition-colors hover:bg-white/5 rounded-xl text-left"
      >
        <span>{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 text-sm leading-7 text-slate-400">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AiSummaryDemo = () => {
  const [input, setInput] = useState("Worked as a product designer for 5 years. Managed teams, improved engagement by 40%.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  
  const fullText = "Highly motivated Product Designer with 5+ years of experience building scalable design systems and improving user engagement by 40%. Proven track record of leading cross-functional teams in agile environments.";

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratedText("");
    setHasGenerated(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      let currentText = "";
      let i = 0;
      const interval = setInterval(() => {
        currentText += fullText[i];
        setGeneratedText(currentText);
        i++;
        if (i === fullText.length) clearInterval(interval);
      }, 15);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 rounded-xl bg-slate-800/50 p-4 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-cyan-400/50 resize-none"
          placeholder="Yutuqlaringizni yozing..."
        />
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || input.length === 0}
          className="absolute bottom-3 right-3 bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {isGenerating ? "Yaratilmoqda..." : "Yaratish (Generate)"}
        </button>
      </div>

      {(isGenerating || hasGenerated) && (
        <div className="flex items-center gap-3 py-2">
          <Brain className={`h-5 w-5 ${isGenerating ? 'text-cyan-400 animate-pulse' : 'text-cyan-400'}`} />
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            {isGenerating ? (
              <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            )}
          </div>
        </div>
      )}

      {hasGenerated && (
        <div className="rounded-xl bg-cyan-400/10 p-4 border border-cyan-400/20 text-sm text-cyan-100 leading-relaxed min-h-[80px]">
          {generatedText}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }} 
            className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 align-middle"
          />
        </div>
      )}
    </div>
  );
};

const ExperienceDragDemo = () => {
  const [items, setItems] = useState([
    { id: "1", role: "Senior Product Designer", company: "TechCorp Inc.", year: "2021-Present" },
    { id: "2", role: "UI/UX Designer", company: "StartupHub", year: "2019-2021" },
    { id: "3", role: "Graphic Designer", company: "Creative Agency", year: "2017-2019" },
  ]);

  return (
    <div className="space-y-4">
      <div className="text-xs text-slate-400 mb-2">Tajribalarni o'rnini almashtirish uchun torting (Drag & drop)</div>
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
        {items.map((item) => (
          <Reorder.Item 
            key={item.id} 
            value={item} 
            className="rounded-xl border border-slate-700 bg-slate-800/80 p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-cyan-400/30 transition-colors"
          >
            <GripVertical className="h-4 w-4 text-slate-500" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{item.role}</div>
              <div className="text-xs text-slate-400">{item.company} &bull; {item.year}</div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      
      <div className="mt-4 rounded-xl bg-emerald-400/10 p-4 border border-emerald-400/20 flex gap-3 items-start">
        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
        <p className="text-xs text-emerald-100/90">
          <span className="font-semibold text-emerald-300">Suggestion:</span> Start this bullet point with a strong action verb like "Spearheaded" or "Architected" instead of "Responsible for".
        </p>
      </div>
    </div>
  );
};

export function LandingPage() {
  const { t } = useLanguage();
  const [activeDemoTab, setActiveDemoTab] = useState(0);

  const features: Feature[] = [
    {
      title: t.featAiWritingTitle,
      description: t.featAiWritingDesc,
      icon: Brain,
      gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
      iconColor: "text-cyan-400",
      glowColor: "rgba(34, 211, 238, 0.15)",
      badge: t.featAiBadge,
      badgeColor: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
      stat: "3x",
      statLabel: t.featAiStatLabel,
      href: "/features/ai-writing",
    },
    {
      title: t.featAtsTitle,
      description: t.featAtsDesc,
      icon: ShieldCheck,
      gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
      iconColor: "text-violet-400",
      glowColor: "rgba(139, 92, 246, 0.15)",
      badge: t.featAtsBadge,
      badgeColor: "bg-violet-400/10 text-violet-300 border-violet-400/30",
      stat: "98%",
      statLabel: t.featAtsStatLabel,
      href: "/features/ats-formatting",
    },
    {
      title: t.featExportTitle,
      description: t.featExportDesc,
      icon: Download,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      iconColor: "text-emerald-400",
      glowColor: "rgba(52, 211, 153, 0.15)",
      badge: t.featExportBadge,
      badgeColor: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      stat: "2s",
      statLabel: t.featExportStatLabel,
      href: "/features/exports",
    },
    {
      title: t.featPreviewTitle,
      description: t.featPreviewDesc,
      icon: Eye,
      gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      iconColor: "text-orange-400",
      glowColor: "rgba(251, 146, 60, 0.15)",
      badge: t.featPreviewBadge,
      badgeColor: "bg-orange-400/10 text-orange-300 border-orange-400/30",
      stat: "0ms",
      statLabel: t.featPreviewStatLabel,
      href: "/features/preview",
    },
    {
      title: t.featTemplatesTitle,
      description: t.featTemplatesDesc,
      icon: LayoutTemplate,
      gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
      iconColor: "text-pink-400",
      glowColor: "rgba(244, 114, 182, 0.15)",
      badge: t.featTemplatesBadge,
      badgeColor: "bg-pink-400/10 text-pink-300 border-pink-400/30",
      stat: "20+",
      statLabel: t.featTemplatesStatLabel,
      href: "/features/templates",
    },
    {
      title: t.featVersionsTitle,
      description: t.featVersionsDesc,
      icon: GitBranch,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      iconColor: "text-blue-400",
      glowColor: "rgba(96, 165, 250, 0.15)",
      badge: t.featVersionsBadge,
      badgeColor: "bg-blue-400/10 text-blue-300 border-blue-400/30",
      stat: "∞",
      statLabel: t.featVersionsStatLabel,
      href: "/features/versions",
    },
  ];

  const templates: Template[] = [
    {
      name: t.tplModernExecutive,
      description: t.tplModernExecutiveDesc,
      accent: "from-cyan-500/20 to-sky-500/20",
    },
    {
      name: t.tplProductDesigner,
      description: t.tplProductDesignerDesc,
      accent: "from-fuchsia-500/20 to-violet-500/20",
    },
    {
      name: t.tplStartupOperator,
      description: t.tplStartupOperatorDesc,
      accent: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  const faqs = [
    {
      question: t.faq1Q,
      answer: t.faq1A,
    },
    {
      question: t.faq2Q,
      answer: t.faq2A,
    },
    {
      question: t.faq3Q,
      answer: t.faq3A,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">
        {t.skipToContent}
      </a>
      <main id="main-content">
        <section className="mx-auto flex flex-col items-center text-center max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200"
            >
              <Sparkles className="h-4 w-4" />
              {t.heroTagline}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.1]"
            >
              {t.heroTitle1}
              <span className="gradient-text">{t.heroTitle2}</span>{t.heroTitle3}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl"
            >
              {t.heroDesc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a href="#pricing" className="premium-button rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-105 transition-all text-lg">
                {t.startBuildingFree}
              </a>
              <a href="#demo" className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 text-lg">
                {t.seeBuilderInAction}
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/5 bg-white/5 p-1.5 pr-4 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {['jack', 'amy', 'john', 'sarah'].map((seed, i) => (
                    <div key={seed} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800 ring-2 ring-transparent transition-all hover:z-10 hover:scale-110 hover:ring-cyan-400">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=0891b2,0284c7`} alt="User" className="w-full h-full object-cover" />
                  </div>
                  ))}
                </div>
                <span className="font-medium">{t.usedBy}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-slate-300">{t.avgSatisfaction}</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-5xl rounded-3xl border border-white/10 bg-slate-900/80 p-4 sm:p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.15)] premium-card"
          >
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-semibold text-cyan-200 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {t.resumePreview}
                </div>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-700" />
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] text-left">
                {/* Interactive Form Side */}
                <div className="space-y-4 rounded-xl bg-slate-950/50 p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">Live Editor</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Alex Johnson" 
                        id="demo-name"
                        onChange={(e) => {
                          const el = document.getElementById('preview-name');
                          if (el) el.textContent = e.target.value || 'Your Name';
                        }}
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Senior Product Designer" 
                        id="demo-role"
                        onChange={(e) => {
                          const el = document.getElementById('preview-role');
                          if (el) el.textContent = e.target.value || 'Your Role';
                        }}
                        className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Summary</label>
                      <textarea 
                        defaultValue="Passionate about creating intuitive user experiences and leading design systems." 
                        rows={3}
                        onChange={(e) => {
                          const el = document.getElementById('preview-summary');
                          if (el) el.textContent = e.target.value || 'Your summary...';
                        }}
                        className="w-full resize-none rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200">
                    Type in the fields above to see the resume update instantly on the right! 
                  </div>
                </div>

                {/* Live Preview Side */}
                <div className="rounded-xl bg-white p-6 md:p-8 text-slate-900 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <div className="border-b border-slate-200 pb-4 mb-4">
                    <h2 id="preview-name" className="text-2xl font-bold text-slate-900 transition-all duration-200">Alex Johnson</h2>
                    <p id="preview-role" className="text-sm font-semibold text-cyan-700 transition-all duration-200">Senior Product Designer</p>
                    <div className="mt-2 flex gap-3 text-[10px] text-slate-500 font-medium">
                      <span>alex@example.com</span>
                      <span>•</span>
                      <span>+1 234 567 890</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Summary</h3>
                    <p id="preview-summary" className="text-xs text-slate-600 leading-relaxed transition-all duration-200">
                      Passionate about creating intuitive user experiences and leading design systems.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Experience</h3>
                    <div className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-semibold text-slate-900">Lead Designer</h4>
                        <span className="text-[10px] text-slate-500">2021 - Present</span>
                      </div>
                      <div className="text-[10px] text-cyan-700 font-medium mb-1">TechCorp Inc.</div>
                      <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                        <li>Directed the redesign of the core product</li>
                        <li>Managed a team of 4 product designers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="border-y border-white/10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 px-6 py-8 sm:px-8 lg:px-12 relative overflow-hidden" aria-label="Social proof">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:gap-8 relative z-10">
            {[
              { text: t.socialProof1, icon: Star },
              { text: t.socialProof2, icon: Users },
              { text: t.socialProof3, icon: TrendingUp },
              { text: t.socialProof4, icon: CheckCircle }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-md transition-all hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
                >
                  <Icon className="h-4 w-4 text-cyan-400/70 transition-colors group-hover:text-cyan-400" />
                  <span className="font-medium text-slate-400 transition-colors group-hover:text-cyan-100">{item.text}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
             KEY FEATURES — Premium Section
        ═══════════════════════════════════════════ */}
        <section id="features" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">

          {/* Ambient background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/8 via-violet-500/5 to-transparent blur-3xl" />
          </div>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              {t.keyFeatures}
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {t.featuresTitle1}
              <span className="gradient-text">{t.featuresTitle2}</span>{t.featuresTitle3}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              {t.featuresDesc}
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.href} className="block">
                <motion.article
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    boxShadow: "0 0 0 0 transparent",
                  }}
                  whileHover={{
                    boxShadow: `0 20px 60px -10px ${feature.glowColor}, 0 0 0 1px rgba(255,255,255,0.08)`,
                  }}
                >
                  {/* Card gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Shimmer sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <div className="relative h-full flex flex-col">
                    <div>
                      {/* Icon + badge row */}
                      <div className="mb-5 flex items-start justify-between">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br ${feature.gradient} ${feature.badgeColor}`}
                        >
                          <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${feature.badgeColor}`}
                        >
                          {feature.badge}
                        </span>
                      </div>

                      {/* Stat */}
                      <div className="mb-3 flex items-baseline gap-1.5">
                        <span className={`text-3xl font-bold ${feature.iconColor}`}>{feature.stat}</span>
                        <span className="text-xs text-slate-500">{feature.statLabel}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>

                      {/* Description */}
                      <p className="mt-2.5 mb-5 text-sm leading-7 text-slate-400">{feature.description}</p>
                    </div>

                    <div className="mt-auto">
                      {/* Bottom CTA line */}
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-semibold ${feature.iconColor}`}>{t.exploreFeature}</span>
                        <ArrowRight className={`h-3.5 w-3.5 ${feature.iconColor} transition-transform group-hover:translate-x-1`} />
                      </div>
                    </div>
                  </div>
                </motion.article>
                </Link>
              );
            })}
          </div>

          {/* Bottom metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/8 bg-slate-900/50 p-6 backdrop-blur-sm md:grid-cols-4"
          >
            {[
              { icon: Users, value: "12k+", label: t.statActiveUsers, color: "text-cyan-400" },
              { icon: TrendingUp, value: "98%", label: t.statInterviewRate, color: "text-emerald-400" },
              { icon: Star, value: "4.9/5", label: t.statUserRating, color: "text-yellow-400" },
              { icon: Zap, value: "< 10min", label: t.statAvgBuildTime, color: "text-violet-400" },
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <StatIcon className={`h-5 w-5 ${stat.color} mb-1`} />
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12 overflow-hidden relative">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 w-fit">
                {t.demoTagline}
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                {t.demoTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300 mb-8">
                {t.demoDesc}
              </p>
              
              <div className="flex flex-col gap-3">
                {[
                  { title: t.profSummaryTag, desc: t.profSummaryDesc, icon: Brain },
                  { title: t.expBuilder, desc: t.expBuilderDesc, icon: Zap }
                ].map((tab, idx) => {
                  const isActive = activeDemoTab === idx;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDemoTab(idx)}
                      className={`text-left rounded-2xl border p-5 transition-all duration-300 group flex items-start gap-4 ${
                        isActive 
                          ? 'border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]' 
                          : 'border-white/5 bg-white/5 hover:border-white/15 hover:bg-white/10'
                      }`}
                    >
                      <div className={`mt-0.5 rounded-full p-2 transition-colors ${isActive ? 'bg-cyan-400/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                        <Icon className={`h-5 w-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold transition-colors ${isActive ? 'text-cyan-100' : 'text-white'}`}>{tab.title}</h3>
                        <p className={`mt-1.5 text-sm transition-colors ${isActive ? 'text-cyan-100/70' : 'text-slate-400'}`}>{tab.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-[400px]">
              <div className="w-full h-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                {/* Fake App Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">GoPay AI</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  </div>
                </div>

                {/* Dynamic Content Based on Tab */}
                <div className="relative">
                  {activeDemoTab === 0 ? (
                    <motion.div key="tab0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                      <AiSummaryDemo />
                    </motion.div>
                  ) : (
                    <motion.div key="tab1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                      <ExperienceDragDemo />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{t.templatesTagline}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.templatesHeadline}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {templates.map((template) => (
              <article key={template.name} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${template.accent} p-[1px]`}>
                <div className="rounded-[15px] bg-slate-950/90 p-6">
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{template.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-8 lg:p-14 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/20 via-cyan-500/5 to-transparent blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">{t.pricingTagline}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {t.pricingTitle}
                </h2>
              </div>
            </div>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3 relative z-10">
              {/* Free Plan */}
              <div className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-slate-900/60">
                <h3 className="text-xl font-medium text-slate-300">{t.freePlan}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-white">{t.priceFree}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-500">{t.freePlanDesc}</p>
                <a href="#features" className="mt-8 block w-full rounded-full border border-white/10 py-3 text-center text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                  {t.startBuildingFree}
                </a>
              </div>
              
              {/* Pro Plan */}
              <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-b from-cyan-900/40 to-slate-900/40 p-8 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)] backdrop-blur-sm transition-all duration-300 transform md:-translate-y-4 hover:md:-translate-y-6 hover:-translate-y-2 hover:shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)] hover:border-cyan-400/60">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/20">
                  <Star className="h-3 w-3" /> Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white">{t.proPlan}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{t.pricePro}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{t.proPlanDesc}</p>
                <Link href="/checkout?plan=pro" className="mt-8 block w-full rounded-full bg-cyan-500 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all hover:shadow-cyan-400/40">
                  {t.viewPlans}
                </Link>
              </div>

              {/* Premium Plan */}
              <div className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-900/30 to-slate-900/60 p-8 shadow-[0_0_50px_-15px_rgba(251,191,36,0.15)] backdrop-blur-xl transition-all duration-500 transform md:-translate-y-6 hover:md:-translate-y-8 hover:-translate-y-3 hover:shadow-[0_0_80px_-15px_rgba(251,191,36,0.3)] hover:border-amber-400/60 overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30 relative z-10">
                  <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Premium +
                </div>
                <h3 className="text-2xl font-bold text-white relative z-10">{t.premiumPlan}</h3>
                <div className="mt-4 flex items-baseline gap-2 relative z-10">
                  <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent">{t.pricePremium}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-amber-100/70 relative z-10">{t.premiumPlanDesc}</p>
                <Link href="/checkout?plan=premium" className="relative z-10 mt-8 block w-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-3.5 text-center text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">{t.viewPlans}</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{t.testimonialsTagline}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.testimonialsTitle}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                {t.testimonial1}
              </blockquote>
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                {t.testimonial2}
              </blockquote>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{t.faqTagline}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.faqTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} />
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center lg:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              {t.ctaDesc}
            </p>
            <a href="#" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">
              {t.getStartedToday}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>{t.footerCopyright}</p>
          <div className="flex gap-4">
            <a href="#features" className="transition hover:text-white">{t.footerFeatures}</a>
            <a href="#pricing" className="transition hover:text-white">{t.footerPricing}</a>
            <a href="#faq" className="transition hover:text-white">{t.footerFAQ}</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
    
}

