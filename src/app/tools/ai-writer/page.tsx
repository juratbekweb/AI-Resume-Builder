"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { PencilRuler, Sparkles, Loader2, Copy, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function AiWriterPage() {
  useRecentTool('ai-writer', 'AI Writer', 'Tools Hub', '/tools/ai-writer');

  const [prompt, setPrompt] = useState("");
  const [action, setAction] = useState("write");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, action })
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

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <PencilRuler className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">AI Writer Pro</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Draft, improve, or summarize text instantly. Choose your action and let the AI do the heavy lifting.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg mb-12">
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setAction("write")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${action === "write" ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground-secondary hover:text-foreground"}`}
            >
              Write from scratch
            </button>
            <button 
              onClick={() => setAction("improve")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${action === "improve" ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground-secondary hover:text-foreground"}`}
            >
              Improve Text
            </button>
            <button 
              onClick={() => setAction("summarize")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${action === "summarize" ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground-secondary hover:text-foreground"}`}
            >
              Summarize
            </button>
          </div>

          <div className="space-y-4">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={action === "write" ? "E.g. Write an email to my boss asking for a 1-week vacation..." : "Paste your text here..."}
              className="w-full h-40 bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none"
            />

            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
              ) : (
                <><Sparkles className="h-5 w-5" /> Generate</>
              )}
            </Button>
          </div>
        </div>

        {result && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 bg-surface-elevated border border-primary/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Generated Output
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => {setResult(""); setPrompt("");}} className="h-8 border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20">
                  <Eraser className="h-4 w-4 mr-1.5" /> Clear
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 border-border">
                  <Copy className="h-4 w-4 mr-1.5" /> Copy
                </Button>
              </div>
            </div>
            
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground-secondary">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
