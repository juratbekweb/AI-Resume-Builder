"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface SettingsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SettingsNav({ className, items, ...props }: SettingsNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "text-cyan-400"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="settings-active"
                className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
