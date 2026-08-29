'use client';

import { useState } from 'react';
import { Download, User, Briefcase, Star, Printer, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  experience: { company: string; role: string; period: string; bullets: string }[];
  skills: string;
  education: string;
}

const defaultData: ResumeData = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/alexjohnson',
  summary: 'Results-driven software engineer with 5+ years building scalable web applications. Passionate about clean code, performance optimization, and delivering exceptional user experiences.',
  experience: [
    { company: 'TechCorp Inc.', role: 'Senior Software Engineer', period: '2022 – Present', bullets: '• Led migration of monolithic app to microservices, reducing load time by 60%\n• Mentored team of 4 junior engineers and conducted weekly code reviews\n• Architected real-time notification system serving 200K+ daily active users' },
    { company: 'StartupXYZ', role: 'Full Stack Developer', period: '2020 – 2022', bullets: '• Built customer-facing dashboard from scratch using React and Node.js\n• Reduced API response times by 45% through query optimization and caching\n• Shipped 20+ features across 8 product sprints with 99.9% uptime' },
    { company: 'Digital Agency', role: 'Frontend Developer', period: '2019 – 2020', bullets: '• Developed responsive websites for 15+ enterprise clients\n• Improved Lighthouse score from 52 to 96 through performance optimization\n• Established reusable component library used across all client projects' },
  ],
  skills: 'TypeScript, React, Node.js, PostgreSQL, Redis, Docker, AWS, Git, REST APIs, GraphQL',
  education: 'B.S. Computer Science — Stanford University, 2019',
};

export default function ExportsPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<ResumeData>(defaultData);
  const [isExporting, setIsExporting] = useState(false);

  const update = (field: keyof ResumeData, value: string) => setData(prev => ({ ...prev, [field]: value }));
  const updateExp = (i: number, field: string, value: string) =>
    setData(prev => ({ ...prev, experience: prev.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e) }));

  const handlePDF = async () => {
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 600));
    window.print();
    setIsExporting(false);
  };

  const handleDOCX = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Resume</title></head>
      <body style="font-family: Arial, sans-serif;">
        <h1 style="text-align: center; color: #111827;">${data.name}</h1>
        <p style="text-align: center; color: #0e7490; font-weight: bold; font-size: 14pt;">${data.title}</p>
        <p style="text-align: center; color: #6b7280; font-size: 10pt;">${data.email} | ${data.phone} | ${data.linkedin}</p>
        <hr style="border: 1px solid #e5e7eb;" />
        ${data.summary ? `<h3 style="color: #9ca3af; font-size: 11pt; margin-top: 15px;">${t.summary.toUpperCase()}</h3><p style="color: #374151;">${data.summary}</p>` : ''}
        <h3 style="color: #9ca3af; font-size: 11pt; margin-top: 15px;">${t.experience.toUpperCase()}</h3>
        ${data.experience.map(e => `
          <div style="margin-bottom: 10px;">
            <p style="margin: 0;"><b>${e.role}</b><span style="float: right; color: #6b7280;">${e.period}</span></p>
            <p style="margin: 0; color: #0e7490;">${e.company}</p>
            <div style="color: #4b5563; font-size: 10pt; white-space: pre-wrap;">${e.bullets}</div>
          </div>
        `).join('')}
        ${data.skills ? `<h3 style="color: #9ca3af; font-size: 11pt; margin-top: 15px;">${t.skillsTab.toUpperCase()}</h3><p style="color: #374151;">${data.skills}</p>` : ''}
        ${data.education ? `<h3 style="color: #9ca3af; font-size: 11pt; margin-top: 15px;">${t.education.toUpperCase()}</h3><p style="color: #374151;">${data.education}</p>` : ''}
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = `${data.name.replace(/\s+/g, '_')}_Resume.doc`;
    a.click(); 
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`@media print { body > * { display: none !important; } #resume-preview { display: block !important; position: fixed; inset: 0; background: white; } }`}</style>
      <div className="min-h-screen bg-transparent pb-20">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-1/3 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/30">
                <Download className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">{t.exportFeature}</div>
                <h1 className="text-2xl font-bold text-foreground">{t.exportTitle}</h1>
              </div>
            </div>
            <p className="text-foreground-secondary max-w-2xl">{t.exportDesc}</p>
            <div className="mt-4 flex gap-3">
              <button onClick={handlePDF} disabled={isExporting}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 transition-all">
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" /> {t.exportPDF}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Printer className="h-4 w-4" /> {t.exportPDF}
                  </span>
                )}
              </button>
              <button onClick={handleDOCX}
                className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 transition-all">
                <Download className="h-4 w-4" /> {t.exportDOCX}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Form */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4"><User className="h-4 w-4 text-emerald-400" /><span className="text-sm font-semibold text-foreground">{t.personalInfo}</span></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([['name', t.fullName, 'John Smith'],['title', t.jobTitle, 'Senior Engineer'],['email', t.email, 'john@example.com'],['phone', t.phone, '+1 555 000 0000'],['linkedin', 'LinkedIn', 'linkedin.com/in/...']] as const).map(([field, label, placeholder]) => (
                    <div key={field}>
                      <label className="mb-1 block text-xs text-foreground-secondary">{label}</label>
                      <input value={(data as unknown as Record<string, string>)[field]} onChange={e => update(field as keyof ResumeData, e.target.value)} placeholder={placeholder}
                        className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground placeholder-slate-600 focus:border-emerald-400/50 focus:outline-none" />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="mb-1 block text-xs text-foreground-secondary">{t.profSummary}</label>
                  <textarea value={data.summary} onChange={e => update('summary', e.target.value)} rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground placeholder-slate-600 focus:border-emerald-400/50 focus:outline-none" />
                </div>
              </div>

              {data.experience.map((exp, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3"><Briefcase className="h-4 w-4 text-emerald-400" /><span className="text-sm font-semibold text-foreground">{t.experience} {i + 1}</span></div>
                  <div className="grid gap-2 sm:grid-cols-3 mb-2">
                    <div><label className="mb-1 block text-xs text-foreground-secondary">{t.company}</label><input value={exp.company} onChange={e => updateExp(i,'company',e.target.value)} className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" /></div>
                    <div><label className="mb-1 block text-xs text-foreground-secondary">{t.role}</label><input value={exp.role} onChange={e => updateExp(i,'role',e.target.value)} className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" /></div>
                    <div><label className="mb-1 block text-xs text-foreground-secondary">{t.period}</label><input value={exp.period} onChange={e => updateExp(i,'period',e.target.value)} className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" /></div>
                  </div>
                  <textarea value={exp.bullets} onChange={e => updateExp(i,'bullets',e.target.value)} rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" />
                </div>
              ))}

              <div className="rounded-2xl border border-border bg-surface-elevated p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3"><Star className="h-4 w-4 text-emerald-400" /><span className="text-sm font-semibold text-foreground">{t.skillsEdu}</span></div>
                <div className="space-y-3">
                  <div><label className="mb-1 block text-xs text-foreground-secondary">{t.skills}</label><input value={data.skills} onChange={e => update('skills', e.target.value)} className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" /></div>
                  <div><label className="mb-1 block text-xs text-foreground-secondary">{t.education}</label><input value={data.education} onChange={e => update('education', e.target.value)} className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-emerald-400/50 focus:outline-none" /></div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div id="resume-preview" className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-2xl print:rounded-none print:border-0 print:shadow-none">
              <div className="border-b-2 border-slate-200 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-slate-900 print:text-black">{data.name}</h2>
                <p className="text-base font-semibold text-cyan-700">{data.title}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-foreground-secondary">
                  <span>{data.email}</span><span>•</span><span>{data.phone}</span><span>•</span><span>{data.linkedin}</span>
                </div>
              </div>
              {data.summary && <><div className="mb-3"><h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground-secondary">{t.summary}</h3><p className="text-sm text-slate-700 leading-6">{data.summary}</p></div></>}
              <div className="mb-3">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground-secondary">{t.experience}</h3>
                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-sm text-slate-900">{exp.role}</span>
                      <span className="text-xs text-foreground-secondary">{exp.period}</span>
                    </div>
                    <div className="text-xs font-medium text-cyan-700 mb-1">{exp.company}</div>
                    <pre className="whitespace-pre-wrap text-xs text-foreground-secondary leading-5">{exp.bullets}</pre>
                  </div>
                ))}
              </div>
              {data.skills && <div className="mb-3"><h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground-secondary">{t.skillsTab}</h3><p className="text-sm text-slate-700">{data.skills}</p></div>}
              {data.education && <div><h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground-secondary">{t.education}</h3><p className="text-sm text-slate-700">{data.education}</p></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
