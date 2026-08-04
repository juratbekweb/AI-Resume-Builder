"use client";

import * as React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { ScrollHeader } from "./scroll-header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, User, LogOut, Shield, Sparkles } from "lucide-react";
import { useLanguage, Lang } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const languages = [
  { code: "uz" as Lang, label: "O'zbek", flag: "🇺🇿" },
  { code: "ru" as Lang, label: "Русский", flag: "🇷🇺" },
  { code: "en" as Lang, label: "English", flag: "🇺🇸" },
  { code: "tr" as Lang, label: "Türkçe", flag: "🇹🇷" },
];

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <ScrollHeader>
      <Container className="flex h-20 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>

        {/* Right: Desktop Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Language Selector (Visible to all) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="premium-button flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:border-cyan-400/30 hover:scale-105"
            >
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>{languages.find((l) => l.code === lang)?.flag}</span>
              <span className="max-w-[80px] truncate">{languages.find((l) => l.code === lang)?.label}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-800 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {session ? (
            <>

              {/* User Menu */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 hover:scale-105"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/50">
                    {session.user?.name?.[0] || "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{session.user?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                        <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          {(session.user as any)?.role === "ADMIN" ? (
                            <Shield className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span>{(session.user as any)?.role === "ADMIN" ? "Admin Panel" : "Dashboard"}</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t.logout}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">
                {t.login || "Kirish"}
              </Link>
              <Link href="/register" className="relative group overflow-hidden rounded-full p-px font-medium">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-950 rounded-full px-5 py-2 transition-all group-hover:bg-opacity-0">
                  <span className="relative z-10 text-sm font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent group-hover:text-white transition-colors">
                    {t.getStarted || "Ro'yxatdan o'tish"}
                  </span>
                </div>
              </Link>
            </div>
          )}
          
          <MobileMenu />
        </div>
      </Container>
    </ScrollHeader>
  );
}