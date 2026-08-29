"use client";

import React from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Mic, User, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InterviewPrepPage() {
  useRecentTool('interview-prep', 'Interview Prep', 'Tools Hub', '/tools/interview-prep');

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6 relative">
          <Mic className="h-10 w-10 text-primary" />
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</div>
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Interview Prep AI</h1>
        <p className="text-lg text-foreground-secondary max-w-2xl text-center mb-12">
          Practice your interview skills with our AI HR manager. Get real-time feedback on your answers, tone, and technical knowledge.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface border border-border rounded-3xl overflow-hidden flex flex-col relative aspect-video">
            <div className="absolute inset-0 bg-surface-elevated flex flex-col items-center justify-center">
              <User className="h-24 w-24 text-border mb-4" />
              <p className="text-foreground-muted font-medium">Camera Feed Placeholder</p>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border">
              <button className="h-12 w-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-border/50 text-foreground transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="h-12 w-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-border/50 text-foreground transition-colors">
                <Mic className="h-5 w-5" />
              </button>
              <Button className="bg-error text-error-foreground hover:bg-error/90 rounded-full px-6 h-12 font-bold">
                End Mock
              </Button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6 flex flex-col h-full">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Live Feedback
            </h3>
            <div className="flex-1 bg-background rounded-2xl border border-border p-4 overflow-y-auto space-y-4">
              <div className="p-3 bg-surface-elevated rounded-xl border border-border text-sm text-foreground">
                <span className="font-bold text-primary block mb-1">AI Interviewer:</span>
                "Tell me about a time you faced a difficult technical challenge and how you overcame it."
              </div>
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-sm text-foreground">
                <span className="font-bold text-primary block mb-1">Feedback tip:</span>
                Remember to use the STAR method (Situation, Task, Action, Result) for this behavioral question.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
