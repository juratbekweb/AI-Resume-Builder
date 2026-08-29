"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRecentTool } from "@/hooks/useRecentTool";
import { KeyRound, Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PasswordGeneratorPage() {
  useRecentTool('password-generator', 'Password Gen', 'Tools Hub', '/tools/password-generator');

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let newPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center mt-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <KeyRound className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground text-center mb-4">Password Generator</h1>
        <p className="text-lg text-foreground-secondary text-center max-w-2xl mb-12">
          Create strong, secure, and unique passwords instantly to keep your accounts safe.
        </p>

        <div className="w-full bg-surface border border-border rounded-3xl p-8 shadow-lg">
          
          <div className="relative mb-8 group">
            <div className="w-full bg-surface-elevated border-2 border-primary/20 rounded-2xl p-6 pr-24 text-center break-all font-mono text-2xl tracking-wider text-foreground">
              {password}
            </div>
            <button 
              onClick={copyToClipboard}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
              title="Copy"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-foreground">Password Length</label>
                <span className="text-sm font-bold text-primary">{length}</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="64" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={includeUppercase} 
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary bg-surface-elevated border-border"
                />
                <span className="text-sm font-medium text-foreground">Uppercase (A-Z)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={includeNumbers} 
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary bg-surface-elevated border-border"
                />
                <span className="text-sm font-medium text-foreground">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={includeSymbols} 
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary bg-surface-elevated border-border"
                />
                <span className="text-sm font-medium text-foreground">Symbols (!-$^+)</span>
              </label>
            </div>

            <Button 
              onClick={generatePassword} 
              variant="outline"
              className="w-full mt-4 py-6 rounded-xl font-bold border-border hover:bg-surface-elevated"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Generate Another
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
