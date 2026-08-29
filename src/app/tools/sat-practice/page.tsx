"use client";

import React from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { BookOpen, Calculator, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SatPracticePage() {
  useRecentTool('sat-practice', 'Sat Practice', 'Tools Hub', '/tools/sat-practice');

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Digital SAT Practice</h1>
          <p className="text-foreground-secondary max-w-2xl mx-auto">
            Prepare for the new Digital SAT with our adaptive mock exams. Get detailed explanations and track your score improvements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Reading & Writing */}
          <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-all flex flex-col items-center text-center group">
            <div className="p-4 rounded-full bg-surface-elevated border border-border group-hover:bg-primary/10 transition-colors mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Reading & Writing</h3>
            <p className="text-foreground-secondary mb-6 flex-1">
              64 questions across two modules. Practice vocabulary in context, text analysis, and standard English conventions.
            </p>
            <div className="flex items-center gap-4 text-sm text-foreground-muted mb-8">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 64 mins</span>
            </div>
            <Button className="w-full bg-surface-elevated hover:bg-primary hover:text-primary-foreground border border-border transition-colors group-hover:border-primary">
              <Play className="h-4 w-4 mr-2" /> Start Section
            </Button>
          </div>

          {/* Math */}
          <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-all flex flex-col items-center text-center group">
            <div className="p-4 rounded-full bg-surface-elevated border border-border group-hover:bg-primary/10 transition-colors mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Math</h3>
            <p className="text-foreground-secondary mb-6 flex-1">
              44 questions across two modules. Test your algebra, advanced math, problem-solving, and data analysis skills.
            </p>
            <div className="flex items-center gap-4 text-sm text-foreground-muted mb-8">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 70 mins</span>
            </div>
            <Button className="w-full bg-surface-elevated hover:bg-primary hover:text-primary-foreground border border-border transition-colors group-hover:border-primary">
              <Play className="h-4 w-4 mr-2" /> Start Section
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
