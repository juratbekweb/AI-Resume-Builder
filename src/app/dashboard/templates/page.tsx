import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Filter, Eye, CheckCircle2, Star } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const templates = [
    { name: "Executive Pro", category: "Professional", isPremium: true, ats: "99%" },
    { name: "Minimal Tech", category: "Modern", isPremium: false, ats: "95%" },
    { name: "Creative Studio", category: "Creative", isPremium: true, ats: "88%" },
    { name: "Standard ATS", category: "ATS Friendly", isPremium: false, ats: "100%" },
    { name: "Modern Finance", category: "Professional", isPremium: true, ats: "94%" },
    { name: "Graduate Entry", category: "Minimal", isPremium: false, ats: "96%" },
  ]

  const categories = ["All", "Professional", "Modern", "Minimal", "Creative", "ATS Friendly"]

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Template Gallery
          </h2>
          <p className="text-lg text-foreground-secondary font-light max-w-2xl">
            Start with a professionally designed template optimized for ATS systems and modern standards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-surface text-foreground-secondary hover:bg-surface-elevated hover:text-foreground transition-all duration-300 rounded-xl px-5 h-11">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
              i === 0 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-surface text-foreground-secondary border border-border hover:bg-border/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template, i) => (
          <Card key={i} className="group overflow-hidden flex flex-col rounded-[24px] border border-border bg-surface/40 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-colors duration-500 pointer-events-none" />
            
            <div className="aspect-[1/1.4] w-full relative flex items-center justify-center p-6 bg-gradient-to-b from-surface-elevated/80 to-background overflow-hidden">
              <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-[0.03] pointer-events-none" />
              
              {/* Refined document preview */}
              <div className="w-[85%] h-[95%] bg-[#FDFDFD] rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.03] overflow-hidden flex flex-col border border-slate-200/50">
                {template.category === 'Creative' ? (
                  <div className="flex h-full">
                    <div className="w-1/3 bg-slate-50 h-full p-2 border-r border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-slate-200 mx-auto mb-4" />
                      <div className="h-1.5 w-full bg-slate-200/60 rounded mb-2" />
                      <div className="h-1.5 w-full bg-slate-200/60 rounded" />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col gap-3">
                      <div className="h-3 w-1/2 bg-slate-700 rounded" />
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
                      <div className="h-1.5 w-4/5 bg-slate-200 rounded" />
                      <div className="h-12 border border-slate-200/60 rounded mt-auto" />
                    </div>
                  </div>
                ) : template.category === 'Minimal' ? (
                  <div className="p-5 flex flex-col gap-4 h-full">
                    <div className="h-3 w-1/3 bg-slate-700 rounded mx-auto mb-2" />
                    <div className="h-1.5 w-full bg-slate-200 rounded" />
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded mx-auto" />
                    <div className="h-[1px] w-full bg-slate-100 my-2" />
                    <div className="flex-1 space-y-2">
                      <div className="h-1.5 w-full bg-slate-100 rounded" />
                      <div className="h-1.5 w-full bg-slate-100 rounded" />
                      <div className="h-1.5 w-2/3 bg-slate-100 rounded" />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex flex-col gap-3 h-full">
                    <div className="border-b-2 border-slate-700 pb-2 mb-2">
                      <div className="h-4 w-1/2 bg-slate-700 rounded mb-2" />
                      <div className="flex gap-2">
                        <div className="h-1.5 w-1/4 bg-slate-300 rounded" />
                        <div className="h-1.5 w-1/4 bg-slate-300 rounded" />
                      </div>
                    </div>
                    <div className="h-2 w-1/4 bg-slate-700 rounded mt-2" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
                      <div className="h-1.5 w-5/6 bg-slate-200 rounded" />
                    </div>
                    <div className="h-2 w-1/4 bg-slate-700 rounded mt-4" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
                      <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 items-end">
                {template.isPremium && (
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1.5 border border-primary/30">
                    <Star className="h-3 w-3 fill-primary-foreground" /> Premium
                  </span>
                )}
                <span className="bg-surface/80 backdrop-blur-md text-emerald-400 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold border border-emerald-500/20 shadow-lg flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> ATS {template.ats}
                </span>
              </div>
              
              <div className="absolute inset-0 bg-background/80 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] transition-transform hover:scale-105 rounded-full px-8 py-6 font-bold">
                  Use Template
                </Button>
                <Button variant="outline" className="bg-surface/50 backdrop-blur-md border-border text-foreground hover:bg-border/50 rounded-full px-8 h-10 transition-transform hover:scale-105">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
              </div>
            </div>
            <div className="p-6 border-t border-border relative z-10 bg-surface/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-foreground-secondary font-medium">{template.category}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
