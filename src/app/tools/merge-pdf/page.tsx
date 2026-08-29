"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Layers, Loader2, Upload, Trash2, File, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function MergePdfPage() {
  useRecentTool('merge-pdf', 'Merge PDF', 'Tools Hub', '/tools/merge-pdf');

  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }
    
    setIsProcessing(true);
    const formData = new FormData();
    files.forEach(f => formData.append("files", f));

    try {
      const res = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        setIsProcessing(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to merge");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged_document.pdf";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during merging.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Layers className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">Merge PDF</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Combine multiple PDF files into one easily. Upload files, reorder them, and hit Merge.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg">
          <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-surface-elevated transition-colors cursor-pointer relative mb-8">
            <input 
              type="file" 
              multiple 
              accept=".pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <Upload className="h-10 w-10 text-foreground-muted mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Click or drag files here</h3>
            <p className="text-sm text-foreground-secondary">Only PDF files are supported</p>
          </div>

          {files.length > 0 && (
            <div className="mb-8 space-y-3">
              <h4 className="font-bold text-foreground mb-4">Selected Files ({files.length})</h4>
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <File className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                  </div>
                  <button onClick={() => removeFile(idx)} className="p-2 hover:bg-red-500/10 text-foreground-muted hover:text-red-500 rounded-lg transition-colors shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button 
            onClick={handleMerge} 
            disabled={files.length < 2 || isProcessing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Merging...</>
            ) : (
              <><Sparkles className="mr-2 h-5 w-5" /> Merge PDFs</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
