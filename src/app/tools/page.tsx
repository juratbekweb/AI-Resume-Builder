"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  Search, FileText, FileCode2, SpellCheck2, GraduationCap, Briefcase, 
  PencilRuler, FolderKanban, ArrowRight, BookOpen, Calculator, Globe, 
  Target, Mic, MessageSquare, Sparkles, BrainCircuit, BarChart, Clock
} from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ToolsHubPage() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<{title: string; time: string; icon: React.ElementType; href: string}[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load favorites & recents on mount based on auth status
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      // Fetch from API
      fetch("/api/tools/favorites").then(r => r.json()).then(data => {
        if (data.favorites) setFavorites(data.favorites);
      });
      fetch("/api/tools/recents").then(r => r.json()).then(data => {
        if (data.recents) {
          const mapped = data.recents.map((r: any) => ({
            title: r.title,
            time: new Date(r.lastUsedAt).toLocaleDateString(),
            icon: Clock, // We use a generic icon since we didn't store the icon
            href: r.route
          }));
          setRecentItems(mapped);
        }
      });
    } else {
      // Load from Local Storage fallback
      const storedFavs = localStorage.getItem("DocNova_favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      
      setRecentItems([
        { title: "Resume: Senior Frontend Dev", time: "10m ago", icon: FileText, href: "/tools/resume-builder" },
        { title: "IELTS Reading Mock - Section 3", time: "2h ago", icon: GraduationCap, href: "/tools/ielts-mock" },
        { title: "Cover Letter: Google", time: "Yesterday", icon: Briefcase, href: "/tools/cover-letter" },
      ]);
    }
  }, [session, status]);

  const toggleFavorite = async (title: string) => {
    const isFav = favorites.includes(title);
    const updated = isFav ? favorites.filter(f => f !== title) : [...favorites, title];
    setFavorites(updated);

    if (session?.user) {
      if (isFav) {
        await fetch("/api/tools/favorites", { method: "DELETE", body: JSON.stringify({ toolId: title }) });
      } else {
        await fetch("/api/tools/favorites", { method: "POST", body: JSON.stringify({ toolId: title }) });
      }
    } else {
      localStorage.setItem("DocNova_favorites", JSON.stringify(updated));
    }
  };

  // Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const quickTools = [
    { name: "Resume", icon: FileText, filter: "resume" },
    { name: "PDF", icon: FileCode2, filter: "pdf" },
    { name: "IELTS", icon: GraduationCap, filter: "ielts" },
    { name: "Cover Letter", icon: Briefcase, filter: "cover letter" },
    { name: "AI Writer", icon: PencilRuler, filter: "ai writer" },
    { name: "Translator", icon: Globe, filter: "translator" },
    { name: "Grammar", icon: SpellCheck2, filter: "grammar" },
  ];

  const categories = [
    {
      title: "🎓 Education Hub",
      description: "Smart tools to accelerate your learning and test prep.",
      tools: [
        { title: "IELTS Mock Test", description: "Full IELTS simulation with AI scoring for all sections.", icon: GraduationCap, href: "/tools/ielts-mock", badge: "POPULAR" },
        { title: "CEFR Level Test", description: "Accurate A1-C2 English proficiency assessment.", icon: Target, href: "/tools/cefr-test" },
        { title: "SAT Digital Practice", description: "Mock exams for Math and Reading/Writing.", icon: BookOpen, href: "/tools/sat-practice" },
        { title: "AI Study Assistant", description: "Generate summaries, flashcards & quizzes from PDF.", icon: BrainCircuit, href: "/tools/ai-study-assistant", badge: "PRO" },
      ]
    },
    {
      title: "💼 Career Hub",
      description: "Everything you need to land your next dream role.",
      tools: [
        { title: "Resume Builder", description: "Create ATS-friendly resumes in minutes.", icon: FileText, href: "/tools/resume-builder", badge: "POPULAR" },
        { title: "CV Analyzer", description: "AI scoring and improvement suggestions for your CV.", icon: BarChart, href: "/tools/cv-analyzer", badge: "PRO" },
        { title: "Cover Letter AI", description: "Generate tailored cover letters based on job descriptions.", icon: Briefcase, href: "/tools/cover-letter" },
        { title: "Interview Prep AI", description: "Mock interview with HR and technical questions.", icon: Mic, href: "/tools/interview-prep" },
      ]
    },
    {
      title: "✍️ AI Writing",
      description: "Productivity tools to accelerate your workflow.",
      tools: [
        { title: "AI Writer Pro", description: "Draft emails, reports, and articles instantly.", icon: PencilRuler, href: "/tools/ai-writer", badge: "PRO" },
      ]
    },
    {
      title: "🛠️ Quick Utilities",
      description: "Handy tools for everyday tasks.",
      tools: [
        { title: "QR Generator", description: "Create QR codes from URLs or text instantly.", icon: Globe, href: "/tools/qr-generator" },
        { title: "Password Gen", description: "Generate strong and secure passwords.", icon: SpellCheck2, href: "/tools/password-generator" },
        { title: "Word Counter", description: "Count words, characters, and reading time.", icon: FolderKanban, href: "/tools/word-counter" },
      ]
    },
    {
      title: "📄 Work With Files",
      description: "Format, convert, and manage documents.",
      tools: [
        { title: "Merge PDF", description: "Combine multiple PDF files into one.", icon: FileCode2, href: "/tools/merge-pdf" },
        { title: "Compress PDF", description: "Reduce file size of your PDF documents.", icon: FolderKanban, href: "/tools/compress-pdf" },
        { title: "PDF to Word", description: "Extract text and convert PDF to editable formats.", icon: FileCode2, href: "/tools/pdf-to-word" },
      ]
    }
  ];

  // Filtering Logic
  const filteredCategories = categories.map(category => {
    return {
      ...category,
      tools: category.tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              category.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || favorites.includes(tool.title);
        return matchesSearch && matchesTab;
      })
    };
  }).filter(category => category.tools.length > 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero & Search Section */}
      <div className="relative border-b border-border bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Everything you need to <span className="text-primary">get things done.</span>
          </h1>
          <p className="text-lg text-foreground-secondary mb-10 max-w-2xl font-light">
            A unified collection of AI-powered tools, generators, and utilities to boost your productivity.
          </p>

          {/* Universal Search Bar */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-opacity opacity-0 group-focus-within:opacity-100" />
            <div className="relative flex items-center w-full bg-surface-elevated border border-border rounded-2xl p-2 shadow-lg transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
              <Search className="h-5 w-5 text-foreground-muted ml-3" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search for tools, features, or templates..."
                className="flex-1 bg-transparent border-none text-foreground placeholder:text-foreground-muted focus-visible:ring-0 text-base px-4 py-3 h-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface border border-border mr-1 text-xs text-foreground-muted font-medium">
                <span className="text-[10px]">Ctrl</span>+ K
              </div>
            </div>
          </div>

          {/* Quick Tools Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl">
            {quickTools.map((tool, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(tool.filter)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-border text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-border/50 hover:border-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <tool.icon className="h-4 w-4" />
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Continue Where You Left Off */}
        {!searchQuery && activeTab === "all" && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Continue Where You Left Off
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
              {recentItems.map((item, idx) => (
                <a key={idx} href={item.href} className="flex-shrink-0 w-[300px] bg-surface-elevated border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-surface border border-border">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs text-foreground-muted font-medium">{item.time}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm truncate mb-4">{item.title}</h3>
                  <div className="flex items-center text-xs font-bold text-primary group-hover:text-primary/80 transition-colors">
                    Continue <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tabs: All Tools / My Favorites */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-10 border-b border-border pb-4">
          <button 
            onClick={() => setActiveTab("all")}
            className={cn("px-4 py-2 rounded-full text-sm font-bold transition-all", activeTab === "all" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-foreground-secondary hover:text-foreground hover:bg-surface-elevated")}
          >
            All Tools
          </button>
          <button 
            onClick={() => setActiveTab("favorites")}
            className={cn("px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2", activeTab === "favorites" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-foreground-secondary hover:text-foreground hover:bg-surface-elevated")}
          >
            My Favorites ⭐
          </button>
        </div>

        {!searchQuery && activeTab === "all" && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">What Are You Here To Do?</h2>
              <p className="text-foreground-secondary">Explore tools by category to find exactly what you need.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {categories.map((category, idx) => (
                <a key={idx} href={`#category-${idx}`} className="group relative overflow-hidden rounded-2xl bg-surface border border-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_rgba(56,189,248,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </a>
              ))}
            </div>
          </>
        )}

        <div className="space-y-16">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-3xl border border-border">
              <h3 className="text-xl font-medium text-foreground mb-2">{activeTab === "favorites" ? "No favorites yet" : "No tools found"}</h3>
              <p className="text-foreground-secondary">
                {activeTab === "favorites" ? "Click the heart icon on any tool to save it here." : "Try adjusting your search query."}
              </p>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="mt-4 text-primary font-medium hover:underline">Clear search</button>
              )}
            </div>
          ) : (
            filteredCategories.map((category, idx) => (
              <section id={`category-${idx}`} key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                      {category.title}
                    </h2>
                    {activeTab === "all" && <p className="text-foreground-secondary mt-1">{category.description}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIdx) => (
                    <ToolCard
                      key={toolIdx}
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      href={tool.href}
                      badge={tool.badge}
                      badgeColor={tool.badge === 'POPULAR' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : undefined}
                      isFavorite={favorites.includes(tool.title)}
                      onToggleFavorite={() => toggleFavorite(tool.title)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
