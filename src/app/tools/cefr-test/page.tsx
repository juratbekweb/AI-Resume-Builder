"use client";

import React from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CefrTestPage() {
  useRecentTool('cefr-test', 'Cefr Test', 'Tools Hub', '/tools/cefr-test');

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 mt-20">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Target className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground">CEFR Level Test</h1>
        <p className="text-lg text-foreground-secondary max-w-2xl">
          Discover your precise English proficiency level from A1 to C2. Our adaptive AI testing evaluates your grammar, vocabulary, and reading comprehension in just 15 minutes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-12 mb-12">
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">Adaptive Questions</span>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">Instant Results</span>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">Official CEFR Scale</span>
          </div>
        </div>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] transition-all hover:scale-105">
          Start Assessment Now
        </Button>
      </div>
    </div>
  );
}
