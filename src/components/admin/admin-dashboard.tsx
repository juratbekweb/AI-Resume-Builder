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
  const _router = useRouter();
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
    { label: t.totalUsers, value: loading ? "..." : stats.totalUsers.toLocaleString(), icon: Users, color: "from-blue-500 to-primary" },
    { label: t.totalResumes, value: loading ? "..." : stats.totalResumes.toLocaleString(), icon: FileText, color: "from-purple-500 to-pink-500" },
    { label: t.activeUsers, value: loading ? "..." : stats.activeUsers.toLocaleString(), icon: BarChart3, color: "from-green-500 to-primary" },
    { label: t.premiumUsers, value: loading ? "..." : stats.premiumUsers.toLocaleString(), icon: Shield, color: "from-orange-500 to-red-500" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-surface/95 backdrop-blur-xl border-r border-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600">
                <Shield className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DocNova</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-foreground-secondary hover:text-foreground"
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
                    ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary shadow-lg shadow-primary/10"
                    : "text-foreground-secondary hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-xl bg-surface-elevated p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-foreground font-semibold">
                {session?.user?.name?.[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-xs text-foreground-secondary truncate">{session?.user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="mt-2 w-full justify-start text-foreground-secondary hover:text-foreground hover:bg-surface-elevated"
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
        <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-foreground-secondary hover:text-foreground"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-foreground">{t.dashboard}</h1>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 rounded-xl bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-elevated hover:scale-105"
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
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-border shadow-2xl overflow-hidden"
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
                          ? "bg-primary/20 text-primary"
                          : "text-foreground-secondary hover:bg-surface-elevated"
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
                        <p className="text-sm font-medium text-foreground-secondary">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-foreground" />
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
            <Card className="border-border bg-surface/80 backdrop-blur-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t.recentUsers}</h3>
              <div className="space-y-3">
                {recentUsers.length > 0 ? recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-4 hover:bg-surface-elevated transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-foreground font-semibold">
                        {user.name[0] || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-foreground-secondary">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-foreground-secondary">{user.createdAt}</span>
                  </div>
                )) : (
                  <p className="text-foreground-secondary text-center py-8">Hozircha foydalanuvchilar yo&apos;q</p>
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
