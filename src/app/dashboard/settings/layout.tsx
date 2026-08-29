import { SettingsNav } from "@/components/layout/settings-nav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Security & 2FA",
    href: "/dashboard/settings/security",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Language",
    href: "/dashboard/settings/language",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Privacy",
    href: "/dashboard/settings/privacy",
  },
  {
    title: "Sessions",
    href: "/dashboard/settings/sessions",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12">
      <div className="space-y-0.5 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Settings</h2>
        <p className="mt-2 text-lg text-slate-400 font-light">
          Manage your account settings, preferences, and security.
        </p>
      </div>
      
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <SettingsNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <div className="rounded-[24px] border border-white/5 bg-[#0a0f1c] p-6 sm:p-10 shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
