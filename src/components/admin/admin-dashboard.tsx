"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Users,
  FileText,
  Settings,
  BarChart3,
  Shield,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AdminStats = {
  totalUsers: number;
  totalResumes: number;
  activeUsers: number;
  premiumUsers: number;
};

type RecentUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Language = "uz" | "ru" | "en";

const translations = {
  uz: {
    dashboard: "Admin Panel",
    overview: "Umumiy ko'rinish",
    users: "Foydalanuvchilar",
    resumes: "Rezyumelar",
    settings: "Sozlamalar",
    statistics: "Statistika",
    logout: "Chiqish",
    totalUsers: "Jami foydalanuvchilar",
    totalResumes: "Jami rezyumelar",
    activeUsers: "Faol foydalanuvchilar",
    premiumUsers: "Premium foydalanuvchilar",
    recentUsers: "So'ngi foydalanuvchilar",
    userManagement: "Foydalanuvchilarni boshqarish",
    systemSettings: "Tizim sozlamalari",
    selectLanguage: "Tilni tanlang",
  },
  ru: {
    dashboard: "Админ Панель",
    overview: "Обзор",
    users: "Пользователи",
    resumes: "Резюме",
    settings: "Настройки",
    statistics: "Статистика",
    logout: "Выход",
    totalUsers: "Всего пользователей",
    totalResumes: "Всего резюме",
    activeUsers: "Активных пользователей",
    premiumUsers: "Premium пользователей",
    recentUsers: "Последние пользователи",
    userManagement: "Управление пользователями",
    systemSettings: "Настройки системы",
    selectLanguage: "Выберите язык",
  },
  en: {
    dashboard: "Admin Panel",
    overview: "Overview",
    users: "Users",
    resumes: "Resumes",
    settings: "Settings",
    statistics: "Statistics",
    logout: "Logout",
    totalUsers: "Total Users",
    totalResumes: "Total Resumes",
    activeUsers: "Active Users",
    premiumUsers: "Premium Users",
    recentUsers: "Recent Users",
    userManagement: "User Management",
    systemSettings: "System Settings",
    selectLanguage: "Select Language",
  },
};

export function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("uz");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [stats, setStats] = useState<AdminStats>({ totalUsers: 0, totalResumes: 0, activeUsers: 0, premiumUsers: 0 });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];

  // Fetch real data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setRecentUsers(data.recentUsers);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const menuItems = [
    { icon: BarChart3, label: t.overview, href: "/admin", active: true },
    { icon: Users, label: t.users, href: "/admin/users", active: false },
    { icon: FileText, label: t.resumes, href: "/admin/resumes", active: false },
    { icon: Settings, label: t.settings, href: "/admin/settings", active: false },
  ];

  const languages = [
    { code: "uz" as Language, label: "O'zbek", flag: "🇺🇿" },
    { code: "ru" as Language, label: "Русский", flag: "🇷🇺" },
    { code: "en" as Language, label: "English", flag: "🇺🇸" },
  ];

  const statsData = [
    { label: t.totalUsers, value: loading ? "..." : stats.totalUsers.toLocaleString(), icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: t.totalResumes, value: loading ? "..." : stats.totalResumes.toLocaleString(), icon: FileText, color: "from-purple-500 to-pink-500" },
    { label: t.activeUsers, value: loading ? "..." : stats.activeUsers.toLocaleString(), icon: BarChart3, color: "from-green-500 to-emerald-500" },
    { label: t.premiumUsers, value: loading ? "..." : stats.premiumUsers.toLocaleString(), icon: Shield, color: "from-orange-500 to-red-500" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GoPay</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold">
                {session?.user?.name?.[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="mt-2 w-full justify-start text-slate-400 hover:text-white hover:bg-white/5"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-slate-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-white">{t.dashboard}</h1>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 hover:scale-105"
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find((l) => l.code === language)?.flag}</span>
                <span>{languages.find((l) => l.code === language)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800 border border-white/10 shadow-2xl overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        language === lang.code
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="premium" className="relative overflow-hidden p-6 hover:scale-105 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-white/10 bg-slate-900/80 backdrop-blur-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{t.recentUsers}</h3>
              <div className="space-y-3">
                {recentUsers.length > 0 ? recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold">
                        {user.name[0] || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{user.createdAt}</span>
                  </div>
                )) : (
                  <p className="text-slate-400 text-center py-8">Hozircha foydalanuvchilar yo'q</p>
                )}
              </div>
            </Card>
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}