"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { BarChart, CheckCircle2, AlertTriangle, Loader2, Sparkles, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function CvAnalyzerPage() {
  useRecentTool('cv-analyzer', 'Cv Analyzer', 'Tools Hub', '/tools/cv-analyzer');

  const [cvText, setCvText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/cv-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobDescription: jobDesc })
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        setIsAnalyzing(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to analyze");
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-4xl mx-auto mt-16">
        {!result ? (
          <div className="flex flex-col items-center justify-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <BarChart className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">CV Analyzer</h1>
            <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
              Paste your CV text and optionally a Job Description. Our AI will score it and provide actionable feedback.
            </p>

            <div className="w-full max-w-2xl space-y-6 bg-surface border border-border rounded-3xl p-8 mb-12 shadow-lg">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Resume / CV Text *</label>
                <textarea 
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your entire resume text here..."
                  className="w-full h-48 bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Job Description (Optional)</label>
                <textarea 
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description you are targeting..."
                  className="w-full h-32 bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none"
                />
              </div>

              <Button 
                onClick={handleAnalyze} 
                disabled={!cvText.trim() || isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="mr-2 h-5 w-5" /> Analyze My CV</>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <button 
              onClick={() => setResult(null)}
              className="flex items-center text-sm font-medium text-foreground-muted hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Analyzer
            </button>
            
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              {/* Score Card */}
              <div className="bg-surface border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-6">Overall ATS Score</h3>
                
                <div className="relative h-40 w-40 flex items-center justify-center mb-6">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={result.score >= 80 ? "#10b981" : result.score >= 50 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="3"
                      strokeDasharray={`${result.score}, 100`}
                      className="drop-shadow-lg"
                    />
                  </svg>
                  <span className="text-5xl font-black text-foreground drop-shadow-md">{result.score}</span>
                </div>
                <p className="text-sm text-foreground-secondary">
                  {result.score >= 80 ? "Great job! Your CV is well optimized." : "Needs improvement to pass ATS filters."}
                </p>
              </div>

              {/* Feedback Details */}
              <div className="space-y-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                  <h4 className="flex items-center font-bold text-emerald-400 mb-4"><CheckCircle2 className="h-5 w-5 mr-2" /> Strengths</h4>
                  <ul className="space-y-2">
                    {result.strengths?.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-emerald-100/80 flex items-start">
                        <span className="mr-2 mt-1 block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <h4 className="flex items-center font-bold text-red-400 mb-4"><AlertTriangle className="h-5 w-5 mr-2" /> Weaknesses</h4>
                  <ul className="space-y-2">
                    {result.weaknesses?.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-red-100/80 flex items-start">
                        <span className="mr-2 mt-1 block h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface-elevated border border-border rounded-2xl p-6">
                  <h4 className="flex items-center font-bold text-primary mb-4"><Sparkles className="h-5 w-5 mr-2" /> Improvement Tips</h4>
                  <ul className="space-y-2">
                    {result.tips?.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-foreground-secondary flex items-start">
                        <span className="mr-2 mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
