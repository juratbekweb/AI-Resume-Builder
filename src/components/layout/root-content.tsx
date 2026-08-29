"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"

export function RootContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // List of paths that shouldn't use the marketing layout
  const isAppRoute = pathname?.startsWith('/dashboard') || 
                     pathname?.startsWith('/admin') ||
                     pathname?.startsWith('/login') ||
                     pathname?.startsWith('/register') ||
                     pathname?.startsWith('/forgot-password') ||
                     pathname?.startsWith('/reset-password')

  return (
    <>
      {!isAppRoute && <Navbar />}
      <main className={!isAppRoute ? "flex-1 pt-20" : "flex-1 flex flex-col h-full"}>
        {children}
      </main>
    </>
  )
}
