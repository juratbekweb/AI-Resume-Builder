"use client";

import React from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { BrainCircuit, UploadCloud, FileText, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiStudyAssistantPage() {
  useRecentTool('ai-study-assistant', 'Ai Study Assistant', 'Tools Hub', '/tools/ai-study-assistant');

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-16">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6 shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)]">
          <BrainCircuit className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">AI Study Assistant</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Upload your textbooks, lecture notes, or PDFs. Our AI will automatically generate summaries, flashcards, and practice quizzes to help you learn faster.
        </p>

        <div className="w-full max-w-2xl bg-surface border border-border border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="p-4 rounded-full bg-surface-elevated border border-border mb-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
            <UploadCloud className="h-8 w-8 text-foreground-muted group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Upload Document</h3>
          <p className="text-sm text-foreground-muted mb-6">Drag and drop your PDF, DOCX, or TXT files here, or click to browse.</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-full">
            Choose File
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
          <div className="bg-surface-elevated border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="p-2 rounded bg-surface border border-border"><FileText className="h-5 w-5 text-primary" /></div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Smart Summaries</h4>
              <p className="text-xs text-foreground-secondary mt-1">Get the key points in seconds.</p>
            </div>
          </div>
          <div className="bg-surface-elevated border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="p-2 rounded bg-surface border border-border"><LayoutList className="h-5 w-5 text-primary" /></div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Auto Flashcards</h4>
              <p className="text-xs text-foreground-secondary mt-1">Memorize terms easily with AI cards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
