"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HeroFloatingCard } from "./hero-floating-card";

export function HeroResumePreview() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 flex justify-center [perspective:2000px]">
      {/* Floating Cards */}
      <HeroFloatingCard text="ATS Score 96%" className="-left-8 sm:-left-16 top-12" delay={0.2} duration={4.5} />
      <HeroFloatingCard text="Grammar Fixed" className="-right-6 sm:-right-12 top-32" delay={0.5} yOffset={20} duration={5} />
      <HeroFloatingCard text="PDF Ready" className="-left-4 sm:-left-10 bottom-40" delay={0.8} yOffset={10} duration={4.2} />
      <HeroFloatingCard text="Recruiter Approved" className="-right-10 sm:-right-20 bottom-20" delay={1.1} yOffset={18} duration={4.8} />

      {/* 3D Animated Container for the Resume */}
      <motion.div
        className="w-full relative z-10 will-change-transform"
        initial={{ opacity: 0, rotateY: 12, rotateX: 5, y: 40 }}
        animate={{ 
          opacity: 1, 
          rotateY: -4,
          rotateX: 2,
          y: [-5, 5, -5]
        }}
        transition={{
          opacity: { duration: 0.8 },
          rotateY: { duration: 1.5, type: "spring" },
          rotateX: { duration: 1.5, type: "spring" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bg-white text-slate-900 rounded-lg shadow-2xl p-6 sm:p-8 aspect-[1/1.35] border border-slate-200 overflow-hidden relative">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 mb-4">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">John Anderson</h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">Senior Frontend Engineer</p>
          </div>

          {/* Professional Summary */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Professional Summary</p>
            <p className="text-xs leading-relaxed text-slate-700">
              Detail-oriented frontend engineer with 6+ years of experience building scalable web applications. Adept at leveraging React, Next.js, and TypeScript to deliver performant and accessible user interfaces.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Experience</p>
            
            <div className="mb-3">
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="text-xs font-bold text-slate-900">Senior Software Engineer</p>
                <span className="text-[10px] text-slate-500">2022 - Present</span>
              </div>
              <p className="text-[10px] font-semibold text-cyan-600 mb-1">Stripe</p>
              <ul className="text-[10px] leading-relaxed text-slate-700 list-disc list-inside space-y-0.5 ml-1">
                <li>Spearheaded the migration of the core dashboard to Next.js App Router.</li>
                <li>Improved web vitals by 40% through advanced caching and component optimization.</li>
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="text-xs font-bold text-slate-900">Frontend Engineer</p>
                <span className="text-[10px] text-slate-500">2019 - 2022</span>
              </div>
              <p className="text-[10px] font-semibold text-cyan-600 mb-1">Google</p>
              <ul className="text-[10px] leading-relaxed text-slate-700 list-disc list-inside space-y-0.5 ml-1">
                <li>Developed reusable UI components for Google Cloud Console.</li>
                <li>Mentored junior engineers and led accessibility compliance initiatives.</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Education</p>
            <div className="flex justify-between items-baseline">
              <p className="text-xs font-bold text-slate-900">B.S. Computer Science</p>
              <span className="text-[10px] text-slate-500">2015 - 2019</span>
            </div>
            <p className="text-[10px] text-slate-700">University of Technology</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
