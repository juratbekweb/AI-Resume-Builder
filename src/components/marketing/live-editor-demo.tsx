"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Mail, Phone, MapPin } from "lucide-react";
import type { GeneratedResume } from "@/core/ai/resume-generation-schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface LiveEditorFormState {
  name: string;
  role: string;
  summary: string;
}

interface ResumePreviewProps {
  name: string;
  role: string;
  summary: string;
  generatedData?: GeneratedResume | null;
}

// ---------------------------------------------------------------------------
// Static sample data for sections not editable in the demo
// ---------------------------------------------------------------------------
const SAMPLE_EXPERIENCE = [
  {
    title: "Lead Designer",
    company: "TechCorp Inc.",
    period: "2021 – Present",
    bullets: [
      "Directed the full redesign of the core product, increasing retention by 28%",
      "Managed a cross-functional team of 4 designers across 3 product lines",
    ],
  },
];

const SAMPLE_EDUCATION = {
  degree: "B.Sc. Computer Science",
  school: "State University",
  year: "2018",
};

const SAMPLE_SKILLS_STATIC = ["Figma", "Sketch", "Prototyping", "Design Systems", "User Research"];

// ---------------------------------------------------------------------------
// Resume Preview sub-component
// ---------------------------------------------------------------------------
export function ResumePreview({ name, role, summary, generatedData }: ResumePreviewProps) {
  const displayName = name.trim() || "Your Name";
  const displayRole = role.trim() || "Your Professional Title";
  const displaySummary =
    summary.trim() || "Your professional summary will appear here.";

  const experience = generatedData?.experience ?? SAMPLE_EXPERIENCE.map((e) => ({
    jobTitle: e.title,
    company: e.company,
    period: e.period,
    bullets: e.bullets,
  }));
  const skills = generatedData?.skills ?? SAMPLE_SKILLS_STATIC;

  return (
    <div
      className="rounded-xl bg-white text-slate-900 shadow-2xl relative overflow-hidden"
      aria-label="Resume preview"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600" />

      <div className="p-6 md:p-7 pt-7">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4 mb-4">
          <h2
            className="text-xl font-bold text-slate-900 leading-tight tracking-tight"
            data-testid="preview-name"
          >
            {displayName.toUpperCase()}
          </h2>
          <p
            className="text-sm font-semibold text-cyan-700 mt-0.5"
            data-testid="preview-role"
          >
            {displayRole}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" />
              alex@example.com
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5" />
              +1 234 567 890
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              New York, NY
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Summary
          </h3>
          <p
            className="text-[11px] text-slate-700 leading-relaxed"
            data-testid="preview-summary"
          >
            {displaySummary}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Experience
          </h3>
          {experience.map((exp, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex justify-between items-baseline">
                <h4 className="text-[11px] font-semibold text-slate-900">{exp.jobTitle}</h4>
                {exp.period && (
                  <span className="text-[9px] text-slate-500">{exp.period}</span>
                )}
              </div>
              {exp.company && (
                <div className="text-[9px] text-cyan-700 font-medium mb-1">{exp.company}</div>
              )}
              <ul className="list-disc pl-3 text-[10px] text-slate-600 space-y-0.5">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-4">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Education
          </h3>
          <div className="flex justify-between items-baseline">
            <h4 className="text-[11px] font-semibold text-slate-900">{SAMPLE_EDUCATION.degree}</h4>
            <span className="text-[9px] text-slate-500">{SAMPLE_EDUCATION.year}</span>
          </div>
          <div className="text-[9px] text-slate-500">{SAMPLE_EDUCATION.school}</div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Skills
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded px-1.5 py-0.5 text-[9px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live Editor Demo
// ---------------------------------------------------------------------------
interface LiveEditorDemoProps {
  /** If provided, the AI-generated data overrides preview sections */
  generatedData?: GeneratedResume | null;
  /** Called when any field changes — lets parent sync with AI generator */
  onFieldChange?: (state: LiveEditorFormState) => void;
}

export function LiveEditorDemo({ generatedData, onFieldChange }: LiveEditorDemoProps) {
  const [name, setName] = useState("Alex Johnson");
  const [role, setRole] = useState("Senior Product Designer");
  const [summary, setSummary] = useState(
    "Passionate about creating intuitive user experiences and leading design systems that scale."
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onFieldChange?.({ name: e.target.value, role, summary });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
    onFieldChange?.({ name, role: e.target.value, summary });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
    onFieldChange?.({ name, role, summary: e.target.value });
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
      {/* ── LEFT: Editor form ── */}
      <div
        className="space-y-4 rounded-xl bg-surface-elevated p-5 border border-white/5"
        role="form"
        aria-label="Live resume editor"
      >
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4 text-cyan-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-white">Live Editor</span>
        </div>

        <div className="space-y-3">
          {/* Full Name */}
          <div>
            <label
              htmlFor="demo-full-name"
              className="text-xs text-slate-400 mb-1 block font-medium"
            >
              Full Name
            </label>
            <input
              id="demo-full-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              aria-label="Full name"
              className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          {/* Professional Role */}
          <div>
            <label
              htmlFor="demo-role"
              className="text-xs text-slate-400 mb-1 block font-medium"
            >
              Professional Role
            </label>
            <input
              id="demo-role"
              type="text"
              value={role}
              onChange={handleRoleChange}
              aria-label="Professional role"
              className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors"
              placeholder="e.g. Senior Product Designer"
            />
          </div>

          {/* Professional Summary */}
          <div>
            <label
              htmlFor="demo-summary"
              className="text-xs text-slate-400 mb-1 block font-medium"
            >
              Professional Summary
            </label>
            <textarea
              id="demo-summary"
              value={summary}
              onChange={handleSummaryChange}
              rows={3}
              aria-label="Professional summary"
              className="w-full resize-none rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors"
              placeholder="Describe your professional background..."
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200"
          aria-live="polite"
        >
          ✨ Type in the fields above — the resume preview updates instantly!
        </motion.div>
      </div>

      {/* ── RIGHT: Live Preview ── */}
      <ResumePreview
        name={name}
        role={role}
        summary={summary}
        generatedData={generatedData}
      />
    </div>
  );
}
