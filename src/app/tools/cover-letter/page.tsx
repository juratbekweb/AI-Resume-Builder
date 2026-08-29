"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Briefcase, FileText, Wand2, Loader2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function CoverLetterPage() {
  useRecentTool('cover-letter', 'Cover Letter', 'Tools Hub', '/tools/cover-letter');

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("Professional and confident");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleGenerate = async () => {
    if (!role || !company) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company, skills, tone })
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        setIsGenerating(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to generate");
      
      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([result], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${company}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 mt-12">
        
        {/* Input Form */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Cover Letter AI</h1>
            <p className="text-lg text-foreground-secondary mb-8">
              Generate a highly tailored cover letter in seconds. Just paste the job description and your skills.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Job Title *</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer" 
                className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Company Name *</label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google" 
                className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Key Skills / Job Description</label>
              <textarea 
                rows={4}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Paste your top skills or the job requirements here..." 
                className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Tone</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              >
                <option value="Professional and confident">Professional & Confident</option>
                <option value="Friendly and approachable">Friendly & Approachable</option>
                <option value="Enthusiastic and passionate">Enthusiastic & Passionate</option>
              </select>
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={!role || !company || isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] py-6 text-base rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="h-5 w-5" /> Generate Cover Letter</>
              )}
            </Button>
          </div>
        </div>

        {/* Output */}
        <div className="flex-1 bg-surface border border-border rounded-3xl p-8 flex flex-col relative min-h-[500px]">
          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <FileText className="h-16 w-16 text-foreground-muted mb-6" />
              <h3 className="text-xl font-bold text-foreground-muted mb-2">Your Letter Will Appear Here</h3>
              <p className="text-sm text-foreground-secondary max-w-sm">
                Fill in the details on the left and hit generate to see the magic happen.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                <h3 className="text-lg font-bold text-foreground">Generated Result</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 border-border">
                    <Copy className="h-4 w-4 mr-1.5" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadText} className="h-8 border-border">
                    <Download className="h-4 w-4 mr-1.5" /> Save
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap text-sm leading-relaxed text-foreground-secondary">
                {result}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
