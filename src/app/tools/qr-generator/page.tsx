"use client";

import React, { useState, useRef } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { QrCode, Download, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGeneratorPage() {
  useRecentTool('qr-generator', 'QR Generator', 'Tools Hub', '/tools/qr-generator');

  const [text, setText] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "docnova-qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <QrCode className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">QR Code Generator</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Create instantly scannable QR codes for your URLs, text, or contacts. Download as PNG.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center">
          
          <div className="flex-1 w-full space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <Link2 className="h-4 w-4" /> URL or Text
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-32 bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-surface-elevated border border-border rounded-2xl min-w-[300px]">
            <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-inner">
              <QRCodeCanvas 
                value={text || "https://docnova.vercel.app"} 
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
              />
            </div>
            <Button 
              onClick={downloadQR} 
              disabled={!text}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-bold shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)] disabled:opacity-50"
            >
              <Download className="mr-2 h-5 w-5" /> Download PNG
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
