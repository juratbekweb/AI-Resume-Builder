import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Wand2, Edit3, AlignLeft, Sparkles, Languages, CheckSquare } from "lucide-react"

import { Card } from "@/components/ui/card"

export default async function AIToolsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const tools = [
    { name: "Improve Writing", desc: "Paste text and AI improves its professional tone.", icon: Edit3 },
    { name: "Generate Summary", desc: "Generate a strong professional summary.", icon: AlignLeft },
    { name: "Generate Experience", desc: "Turn simple notes into strong resume bullets.", icon: Sparkles },
    { name: "Generate Cover Letter", desc: "Generate a personalized cover letter.", icon: Wand2 },
    { name: "ATS Analyzer", desc: "Analyze your resume against ATS requirements.", icon: CheckSquare },
    { name: "Translate", desc: "Translate documents preserving professional tone.", icon: Languages },
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Tools Center</h2>
        <p className="text-muted-foreground mt-1">
          Supercharge your career documents with powerful AI assistants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tools.map((tool, i) => (
          <Card key={i} className="p-6 premium-card cursor-pointer hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <tool.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">{tool.name}</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              {tool.desc}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
