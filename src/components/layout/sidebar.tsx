"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "motion/react"
import {
  FileText,
  LayoutDashboard,
  Settings,
  Star,
  PlusCircle,
  LayoutTemplate,
  Wand2,
  Trash2,
  HelpCircle,
  Wrench,
  CreditCard
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"

const topNavigation = [
  { name: "Boshqaruv paneli", href: "/dashboard", icon: LayoutDashboard },
  { name: "Hujjatlarim", href: "/dashboard/documents", icon: FileText },
  { name: "Shablonlar", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Tools Hub", href: "/tools", icon: Wrench },
  { name: "AI Asboblar", href: "/dashboard/ai-tools", icon: Wand2 },
  { name: "Sevimlilar", href: "/dashboard/favorites", icon: Star },
]

const bottomNavigation = [
  { name: "Tariflar", href: "/pricing", icon: CreditCard },
  { name: "Sozlamalar", href: "/dashboard/settings/profile", icon: Settings },
  { name: "Yordam", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-border bg-background text-foreground-secondary">
      <div className="flex h-14 items-center px-6 mt-2">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-primary to-accent text-[10px] text-primary-foreground shadow-lg shadow-primary/20">
            DN
          </div>
          <span className="tracking-tight">
            DocNova
          </span>
        </Link>
      </div>

      <div className="mt-8 px-4">
        <Link href="/dashboard/documents/new">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)] active:scale-[0.98]">
            <PlusCircle className="h-4 w-4" />
            Yangi hujjat
          </button>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-6">
        <nav className="grid items-start px-3 gap-1">
          {topNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-foreground-secondary hover:bg-border/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-md bg-border/40"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon className={cn("h-4 w-4 relative z-10", isActive ? "text-primary" : "text-foreground-muted group-hover:text-foreground-secondary")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto px-3 pb-4">
        <nav className="grid items-start gap-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname.startsWith("/dashboard/settings") && item.name === "Settings"
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-foreground-secondary hover:bg-border/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-md bg-border/40"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon className={cn("h-4 w-4 relative z-10", isActive ? "text-primary" : "text-foreground-muted group-hover:text-foreground-secondary")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-4 border-t border-border pt-4 px-3 flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md border border-border shadow-sm">
            <AvatarImage src={session?.user?.avatar || session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-surface-elevated text-xs text-foreground-secondary rounded-md">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium text-foreground truncate">{session?.user?.name || "User"}</span>
            <span className="text-xs text-foreground-muted truncate">{session?.user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
