"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import type { GeneratedResume, GeneratedResumeResponse } from "@/core/ai/resume-generation-schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GeneratorState = "idle" | "loading" | "success" | "error";

interface AiGeneratorDemoProps {
  /** Called on successful generation so parent can pass data to LiveEditorDemo */
  onGenerated?: (data: GeneratedResume) => void;
}

// ---------------------------------------------------------------------------
// Uzbek error messages — never expose raw provider errors
// ---------------------------------------------------------------------------
function mapErrorToMessage(status?: number, code?: string): string {
  if (!status) return "AI xizmatiga ulanishda xatolik yuz berdi. Internet aloqasini tekshiring.";
  if (status === 429 || code === "AI_RATE_LIMIT") return "So\u2019rovlar cheklovi oshib ketdi. Biroz kutib, qayta urinib ko\u2019ring.";
  if (status === 400) return "Ma\u2019lumot kiriting yoki kiritilgan ma\u2019lumotni to\u2019g\u2019rilang.";
  if (status === 502 || status === 504 || code === "AI_TIMEOUT") return "AI xizmatida vaqtinchalik muammo yuz berdi. Qayta urinib ko\u2019ring.";
  if (status === 503) return "AI xizmati hozirda mavjud emas. Keyinroq urinib ko\u2019ring.";
  return "Kutilmagan xatolik yuz berdi. Qayta urinib ko\u2019ring.";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function AiGeneratorDemo({ onGenerated }: AiGeneratorDemoProps) {
  const [input, setInput] = useState(
    "Worked as a product designer for 5 years. Managed teams, improved user engagement by 40%, and led design system initiatives across 3 product lines."
  );
  const [state, setState] = useState<GeneratorState>("idle");
  const [result, setResult] = useState<GeneratedResumeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isGeneratingRef = useRef(false);

  const handleGenerate = async () => {
    // Prevent duplicate requests
    if (isGeneratingRef.current) return;

    // Client-side input validation
    const trimmed = input.trim();
    if (trimmed.length < 10) {
      setError("Ma\u2019lumot kiriting.");
      setState("error");
      return;
    }

    isGeneratingRef.current = true;
    setState("loading");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput: trimmed }),
      });

      let json: { success?: boolean; data?: GeneratedResumeResponse; error?: { code?: string; message?: string } };
      try {
        json = await response.json();
      } catch {
        setError(mapErrorToMessage());
        setState("error");
        return;
      }

      if (!response.ok || !json.success) {
        setError(mapErrorToMessage(response.status, json.error?.code));
        setState("error");
        return;
      }

      if (!json.data) {
        setError("Javobni qayta ishlashda xatolik yuz berdi.");
        setState("error");
        return;
      }

      setResult(json.data);
      setState("success");
      onGenerated?.(json.data);
    } catch {
      // Network failure
      setError(mapErrorToMessage());
      setState("error");
    } finally {
      isGeneratingRef.current = false;
    }
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setError(null);
  };

  const isLoading = state === "loading";
  const isSuccess = state === "success";

  return (
    <div className="space-y-4" aria-label="DocNova AI resume generator">
      {/* Input area */}
      <div className="relative">
        <label
          htmlFor="ai-generator-input"
          className="text-xs text-slate-400 mb-1.5 block font-medium"
        >
          Kasbiy tajribangizni tasvirlab bering
        </label>
        <textarea
          id="ai-generator-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          rows={4}
          aria-label="Career information input"
          aria-describedby="ai-generator-hint"
          className="w-full rounded-xl bg-slate-800/50 p-4 pr-[110px] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 resize-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-slate-500"
          placeholder="Masalan: 3 yil davomida frontend dasturchisi sifatida ishladim. React ilovalarini yaratdim..."
          maxLength={1000}
        />
        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1.5">
          <button
            onClick={handleGenerate}
            disabled={isLoading || input.trim().length < 10}
            aria-busy={isLoading}
            aria-label={isLoading ? "Generating resume content" : "Generate resume with AI"}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
                Yaratilmoqda...
              </>
            ) : isSuccess ? (
              <>
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Qayta yaratish
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Yaratish
              </>
            )}
          </button>
          <span
            className={`text-[10px] ${input.length > 900 ? "text-orange-400" : "text-slate-500"}`}
            aria-live="polite"
          >
            {input.length}/1000
          </span>
        </div>
        <p id="ai-generator-hint" className="sr-only">
          Enter at least 10 characters describing your career. Click Yaratish to generate structured resume content using AI.
        </p>
      </div>

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 py-2" aria-live="polite" aria-label="AI is processing">
              <Brain className="h-5 w-5 text-cyan-400 animate-pulse flex-shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <div className="text-xs text-cyan-200 mb-1.5">DocNova AI ishlayapti...</div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      <AnimatePresence>
        {state === "error" && error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="alert"
            className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success state */}
      <AnimatePresence>
        {isSuccess && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
            role="region"
            aria-label="Generated resume content"
          >
            {/* Provider badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                AI tomonidan yaratildi{" "}
                <span
                  className={`font-semibold ${result.provider === "gemini" ? "text-cyan-400" : "text-slate-400"}`}
                >
                  ({result.provider === "gemini" ? "Gemini" : "Mahalliy"})
                </span>
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Clear generated result"
              >
                Tozalash
              </button>
            </div>

            {/* Summary */}
            <div className="rounded-xl bg-cyan-400/10 p-4 border border-cyan-400/20">
              <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">
                Kasbiy qisqacha ma&apos;lumot
              </div>
              <p className="text-sm text-cyan-100 leading-relaxed">{result.summary}</p>
            </div>

            {/* Experience */}
            {result.experience.length > 0 && (
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Tajriba
                </div>
                {result.experience.map((exp, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="text-sm font-semibold text-white">{exp.jobTitle}</div>
                    {exp.company && (
                      <div className="text-xs text-cyan-400">{exp.company}</div>
                    )}
                    <ul className="mt-1.5 space-y-1 list-disc pl-4">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-xs text-slate-300">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {result.skills.length > 0 && (
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Ko&apos;nikmalar
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full px-2.5 py-1 text-xs font-medium bg-cyan-400/10 text-cyan-200 border border-cyan-400/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
