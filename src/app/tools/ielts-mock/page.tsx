"use client";

import React from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { GraduationCap, Headphones, BookOpen, PenTool, Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IeltsMockPage() {
  useRecentTool('ielts-mock', 'Ielts Mock', 'Tools Hub', '/tools/ielts-mock');

  const sections = [
    { title: "Listening", icon: Headphones, duration: "40 mins", questions: 40 },
    { title: "Reading", icon: BookOpen, duration: "60 mins", questions: 40 },
    { title: "Writing", icon: PenTool, duration: "60 mins", tasks: 2 },
    { title: "Speaking", icon: Mic, duration: "11-14 mins", parts: 3 },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">IELTS Mock Test</h1>
          <p className="text-foreground-secondary max-w-2xl mx-auto">
            Experience a full-length IELTS simulation. Receive instant AI-generated band scores and detailed feedback for all four sections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-surface-elevated border border-border">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-6">
                <span>⏱ {section.duration}</span>
                <span>•</span>
                <span>{section.questions ? `${section.questions} Questions` : section.tasks ? `${section.tasks} Tasks` : `${section.parts} Parts`}</span>
              </div>
              <Button className="w-full bg-surface-elevated hover:bg-primary/20 hover:text-primary border border-border transition-colors">
                Start Practice <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-surface-elevated border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center mt-12">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready for the full simulation?</h2>
          <p className="text-foreground-secondary mb-6">Take all sections back-to-back under timed conditions.</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-full shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] transition-all hover:scale-105">
            Start Full Mock Test
          </Button>
        </div>
      </div>
    </div>
  );
}
