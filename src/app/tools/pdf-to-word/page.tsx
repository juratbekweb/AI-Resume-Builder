"use client";

import React, { useState } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { FileText, Loader2, Upload, File, Sparkles, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/modals/upgrade-modal";

export default function PdfToWordPage() {
  useRecentTool('pdf-to-word', 'PDF to Text', 'Tools Hub', '/tools/pdf-to-word');

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult("");
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setResult("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pdf/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        setIsProcessing(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to extract");
      
      const data = await res.json();
      setResult(data.text);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during extraction.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([result], {type: 'text/plain'});
    element.href = URL.createObjectURL(fileBlob);
    element.download = `Extracted_${file?.name.replace(".pdf", "")}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">PDF to Text / Word</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Extract text content from any PDF document instantly and save it as a text file.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg">
          
          {!result ? (
            <>
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
                  </div>
                </div>
              )}

              <Button 
                onClick={handleExtract} 
                disabled={!file || isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold text-base shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50"
              >
                {isProcessing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Extracting...</>
                ) : (
                  <><Sparkles className="mr-2 h-5 w-5" /> Extract Text</>
                )}
              </Button>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                <h3 className="text-lg font-bold text-foreground">Extracted Text</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setResult("")} className="h-8 border-border hover:bg-surface-elevated">
                    New File
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 border-border">
                    <Copy className="h-4 w-4 mr-1.5" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadText} className="h-8 border-border">
                    <Download className="h-4 w-4 mr-1.5" /> Save .txt
                  </Button>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-6 max-h-[400px] overflow-y-auto custom-scrollbar text-sm leading-relaxed text-foreground-secondary whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
