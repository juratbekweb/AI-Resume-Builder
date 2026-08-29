"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { Minimize2, Loader2, Upload, File, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function CompressPdfPage() {
  useRecentTool('compress-pdf', 'Compress PDF', 'Tools Hub', '/tools/compress-pdf');

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [stats, setStats] = useState<{ original: number, compressed: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStats(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setStats(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        setIsProcessing(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to compress");
      
      const originalSize = Number(res.headers.get("X-Original-Size") || 0);
      const compressedSize = Number(res.headers.get("X-Compressed-Size") || 0);
      setStats({ original: originalSize, compressed: compressedSize });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during compression.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Minimize2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">Compress PDF</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Reduce the file size of your PDF document without losing quality.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg">
          <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-surface-elevated transition-colors cursor-pointer relative mb-8">
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <Upload className="h-10 w-10 text-foreground-muted mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Click or drag a file here</h3>
            <p className="text-sm text-foreground-secondary">Only PDF files are supported</p>
          </div>

          {file && (
            <div className="mb-8 p-4 bg-background border border-border rounded-xl flex items-center gap-3">
              <File className="h-6 w-6 text-primary shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                <span className="text-xs text-foreground-muted">{formatBytes(file.size)}</span>
              </div>
            </div>
          )}

          {stats && (
            <div className="mb-8 flex gap-4">
              <div className="flex-1 bg-surface-elevated border border-border rounded-xl p-4 text-center">
                <p className="text-xs text-foreground-muted mb-1">Original Size</p>
                <p className="text-lg font-bold text-foreground">{formatBytes(stats.original)}</p>
              </div>
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <p className="text-xs text-emerald-500/80 mb-1">Compressed Size</p>
                <p className="text-lg font-bold text-emerald-500">{formatBytes(stats.compressed)}</p>
              </div>
            </div>
          )}

          <Button 
            onClick={handleCompress} 
            disabled={!file || isProcessing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Compressing...</>
            ) : (
              <><Sparkles className="mr-2 h-5 w-5" /> Compress PDF</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
