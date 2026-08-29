"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Type, Clock, AlignLeft, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WordCounterPage() {
  useRecentTool('word-counter', 'Word Counter', 'Tools Hub', '/tools/word-counter');

  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  
  // Average reading speed is ~225 words per minute
  const readingTime = Math.ceil(words / 225);

  const clearText = () => setText("");

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Type className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">Word Counter</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Count words, characters, and estimate reading time instantly as you type.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-elevated border border-border rounded-2xl p-6 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 mb-3">
                <AlignLeft className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-1">{words}</h3>
              <p className="text-xs text-foreground-muted uppercase tracking-wider font-bold">Words</p>
            </div>
            
            <div className="bg-surface-elevated border border-border rounded-2xl p-6 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 mb-3">
                <Type className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-1">{chars}</h3>
              <p className="text-xs text-foreground-muted uppercase tracking-wider font-bold">Characters</p>
            </div>
            
            <div className="bg-surface-elevated border border-border rounded-2xl p-6 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 mb-3">
                <Scissors className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-1">{charsNoSpaces}</h3>
              <p className="text-xs text-foreground-muted uppercase tracking-wider font-bold">Without Spaces</p>
            </div>
            
            <div className="bg-surface-elevated border border-border rounded-2xl p-6 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 mb-3">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-1">{readingTime} <span className="text-lg font-medium text-foreground-secondary">min</span></h3>
              <p className="text-xs text-foreground-muted uppercase tracking-wider font-bold">Reading Time</p>
            </div>
          </div>

          <div className="relative">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-80 bg-background border border-border rounded-2xl p-6 text-base text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-y"
            />
            {text && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearText}
                className="absolute bottom-4 right-4 bg-surface text-foreground-secondary hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
              >
                Clear Text
              </Button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
