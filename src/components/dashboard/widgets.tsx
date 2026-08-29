"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  FileText,
  Briefcase,
  Wand2,
  Trophy,
  FileBadge,
  MoreVertical,
  Star,
  FileSignature,
  FileCheck,
  FileSpreadsheet,
  Award,
  Clock,
  CheckCircle2,
  PenTool,
  PlusCircle
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function WelcomeWidget({ user }: { user: { name?: string | null; avatar?: string | null } }) {
  return (
    <div className="col-span-full mb-4">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Xush kelibsiz, {user?.name?.split(" ")[0] || "Yaratuvchi"} 👋
      </h2>
      <p className="mt-2 text-lg text-slate-400 font-light">
        Bugun qanday hujjat yaratasiz? AI yordamida professional hujjatlarni bir necha daqiqada tayyorlang.
      </p>
    </div>
  )
}

export function StatCardsWidget() {
  const stats = [
    { label: "Jami hujjatlar", value: "12", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "ATS Balli", value: "87", icon: Trophy, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Arizalar", value: "24", icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "AI Krediti", value: "68", icon: Wand2, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  ]

  return (
    <div className="col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4 mt-6">
      {stats.map((stat, i) => (
        <Card key={i} className={`p-6 flex flex-col justify-between rounded-[20px] bg-[#0a0f1c] border ${stat.border} shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl`}>
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stat.value}</span>
            {stat.label === "ATS Balli" && <span className="text-sm font-medium text-slate-500">/100</span>}
          </div>
        </Card>
      ))}
    </div>
  )
}

export function QuickCreateWidget() {
  const items = [
    { title: "Rezyume", typeId: "resume", desc: "Ish izlash uchun professional rezyume", icon: FileText },
    { title: "CV", typeId: "cv", desc: "Batafsil akademik yoki ilmiy CV", icon: FileBadge },
    { title: "Cover Letter", typeId: "cover-letter", desc: "Moslashtirilgan yozma murojaat", icon: FileSignature },
    { title: "Ariza", typeId: "application", desc: "Rasmiy ish yoki o'qish arizasi", icon: Briefcase },
    { title: "Hisobot", typeId: "report", desc: "Loyihalar va ish hisoboti", icon: FileSpreadsheet },
    { title: "Shartnoma", typeId: "contract", desc: "Huquqiy va biznes shartnomalar", icon: FileCheck },
    { title: "Sertifikat", typeId: "certificate", desc: "Yutuqlar va tasdiqlovchi hujjat", icon: Award },
  ]

  return (
    <div className="col-span-full">
      <h3 className="font-semibold text-lg tracking-tight text-white mb-4">Tezkor yaratish</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <Link key={i} href={`/dashboard/create/${item.typeId}`}>
            <motion.div
              whileHover={{ y: -2 }}
              className="group flex cursor-pointer flex-col p-5 rounded-[20px] border border-white/5 bg-[#0a0f1c] hover:bg-[#0f172a] hover:border-white/10 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all h-full"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function RecentDocumentsWidget({ documents = [1, 2, 3] }: { documents?: number[] }) {
  if (documents.length === 0) {
    return (
      <Card className="col-span-full p-12 flex flex-col items-center justify-center text-center rounded-[24px] border border-white/5 bg-[#0a0f1c] shadow-xl">
        <div className="h-24 w-24 rounded-full bg-blue-500/5 flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-cyan-400/50" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Hali hujjatlaringiz yo&apos;q</h3>
        <p className="text-slate-400 max-w-sm mb-8 font-light">
          AI yordamida birinchi professional hujjatingizni bir necha daqiqada yarating.
        </p>
        <Link href="/dashboard/documents/new">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 rounded-full px-8 py-6 h-auto shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
            <PlusCircle className="mr-2 h-5 w-5" /> Yangi hujjat yaratish
          </Button>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="col-span-full p-6 lg:p-8 rounded-[24px] border border-white/5 bg-[#0a0f1c] shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-lg tracking-tight text-white">So&apos;nggi hujjatlar</h3>
        <Link href="/dashboard/documents" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          Barchasini ko&apos;rish <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      
      <div className="grid gap-3">
        {documents.map((i) => {
          // Mock data for display
          const statuses = [
            { label: "Completed", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
            { label: "In progress", icon: PenTool, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
            { label: "Draft", icon: Clock, color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20" }
          ]
          const status = statuses[i % 3]

          return (
            <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-white/5 bg-slate-900/40 p-4 hover:bg-slate-800/60 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex h-12 w-10 shrink-0 items-center justify-center rounded bg-slate-800 border border-white/10 shadow-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <FileText className="h-4 w-4 text-cyan-400/50 relative z-10" />
                </div>
                <div className="flex-1 space-y-1">
                  <Link href={`/dashboard/editor/doc-${i}`} className="hover:underline decoration-cyan-400/50">
                    <p className="font-medium text-slate-200 group-hover:text-white transition-colors">
                      {i === 1 ? "Senior Product Designer Resume" : i === 2 ? "Frontend Developer CV" : "Marketing Cover Letter"}
                    </p>
                  </Link>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {i === 3 ? "Cover Letter" : "Resume"}
                    </span>
                    <span>•</span>
                    <span>Updated 12 min ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium uppercase tracking-wider ${status.bg} ${status.color}`}>
                  <status.icon className="h-3 w-3" />
                  {status.label}
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/5">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white hover:bg-white/5">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
