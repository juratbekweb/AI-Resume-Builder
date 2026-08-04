'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, User, Briefcase, GraduationCap, Star, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

interface ResumeState {
  name: string; title: string; email: string; phone: string;
  summary: string;
  exp1Role: string; exp1Company: string; exp1Period: string; exp1Desc: string;
  exp2Role: string; exp2Company: string; exp2Period: string; exp2Desc: string;
  skills: string; education: string;
}

const initial: ResumeState = {
  name: 'Alex Johnson', title: 'Software Engineer', email: 'alex@email.com', phone: '+1 555 123 4567',
  summary: 'Passionate engineer with 5+ years building scalable applications.',
  exp1Role: 'Senior Engineer', exp1Company: 'TechCorp', exp1Period: '2022–Present',
  exp1Desc: '• Built microservices handling 200K daily users\n• Cut load time by 60% via optimization',
  exp2Role: 'Developer', exp2Company: 'StartupXYZ', exp2Period: '2020–2022',
  exp2Desc: '• Shipped 20+ features across 8 sprints\n• Reduced API latency by 45%',
  skills: 'TypeScript, React, Node.js, PostgreSQL, Docker, AWS',
  education: 'B.S. Computer Science — Stanford University, 2019',
};

function Field({ label, value, onChange, multiline = false, rows = 2 }: any) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e: any) => onChange(e.target.value)} rows={rows}
          className="w-full resize-none rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-orange-400/50 focus:outline-none" />
      ) : (
        <input value={value} onChange={(e: any) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-orange-400/50 focus:outline-none" />
      )}
    </div>
  );
}

export default function PreviewPage() {
  const { t } = useLanguage();
  const [r, setR] = useState<ResumeState>(initial);
  const set = (k: keyof ResumeState) => (v: string) => setR(p => ({ ...p, [k]: v }));
  const [tab, setTab] = useState<'personal'|'experience'|'skills'>('personal');

  return (
    <div className="min-h-screen bg-slate-950 pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" /></div>
        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-400/30">
              <Eye className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-orange-400">{t.liveFeature}</div>
              <h1 className="text-2xl font-bold text-white">{t.previewTitle}</h1>
            </div>
          </div>
          <p className="text-slate-400 max-w-2xl">{t.previewDesc}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* Form panel */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden backdrop-blur-sm">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {(['personal','experience','skills'] as const).map(tKey => (
                <button key={tKey} onClick={() => setTab(tKey)}
                  className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    tab === tKey ? 'border-b-2 border-orange-400 text-orange-300' : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {tKey === 'personal' ? t.personal : tKey === 'experience' ? t.experience : t.skillsTab}
                </button>
              ))}
            </div>
            <div className="p-5 space-y-4">
              {tab === 'personal' && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={t.fullName} value={r.name} onChange={set('name')} />
                    <Field label={t.jobTitle} value={r.title} onChange={set('title')} />
                    <Field label={t.email} value={r.email} onChange={set('email')} />
                    <Field label={t.phone} value={r.phone} onChange={set('phone')} />
                  </div>
                  <Field label={t.profSummary} value={r.summary} onChange={set('summary')} multiline rows={3} />
                </>
              )}
              {tab === 'experience' && (
                <>
                  <div className="rounded-xl border border-white/8 p-4 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">{t.position} 1</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Field label={t.role} value={r.exp1Role} onChange={set('exp1Role')} />
                      <Field label={t.company} value={r.exp1Company} onChange={set('exp1Company')} />
                      <Field label={t.period} value={r.exp1Period} onChange={set('exp1Period')} />
                    </div>
                    <Field label={t.bulletPoints} value={r.exp1Desc} onChange={set('exp1Desc')} multiline rows={3} />
                  </div>
                  <div className="rounded-xl border border-white/8 p-4 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400">{t.position} 2</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Field label={t.role} value={r.exp2Role} onChange={set('exp2Role')} />
                      <Field label={t.company} value={r.exp2Company} onChange={set('exp2Company')} />
                      <Field label={t.period} value={r.exp2Period} onChange={set('exp2Period')} />
                    </div>
                    <Field label={t.bulletPoints} value={r.exp2Desc} onChange={set('exp2Desc')} multiline rows={3} />
                  </div>
                </>
              )}
              {tab === 'skills' && (
                <>
                  <Field label={t.skills} value={r.skills} onChange={set('skills')} />
                  <Field label={t.education} value={r.education} onChange={set('education')} />
                </>
              )}
            </div>
          </div>

          {/* Live preview */}
          <motion.div
            key={JSON.stringify(r)}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-white/10 bg-white p-8 text-slate-900 shadow-2xl min-h-[600px]"
          >
            <div className="border-b-2 border-slate-100 pb-5 mb-5">
              <h2 className="text-3xl font-bold text-slate-900">{r.name || t.yourName}</h2>
              <p className="text-base font-semibold text-orange-600">{r.title || t.jobTitle}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                {r.email && <span>{r.email}</span>}{r.phone && <span><span>•</span> <span>{r.phone}</span></span>}
              </div>
            </div>
            {r.summary && (
              <div className="mb-5">
                <h3 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t.summary}</h3>
                <p className="text-sm text-slate-600 leading-6">{r.summary}</p>
              </div>
            )}
            <div className="mb-5">
              <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t.experience}</h3>
              {[{role:r.exp1Role,company:r.exp1Company,period:r.exp1Period,desc:r.exp1Desc},{role:r.exp2Role,company:r.exp2Company,period:r.exp2Period,desc:r.exp2Desc}].map((e,i) => e.role && (
                <div key={i} className="mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-sm text-slate-900">{e.role}</span>
                    <span className="text-xs text-slate-400">{e.period}</span>
                  </div>
                  <div className="text-xs font-medium text-orange-600 mb-1">{e.company}</div>
                  <pre className="whitespace-pre-wrap text-xs text-slate-600 leading-5">{e.desc}</pre>
                </div>
              ))}
            </div>
            {r.skills && <div className="mb-4"><h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t.skillsTab}</h3><p className="text-sm text-slate-600">{r.skills}</p></div>}
            {r.education && <div><h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t.education}</h3><p className="text-sm text-slate-600">{r.education}</p></div>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
