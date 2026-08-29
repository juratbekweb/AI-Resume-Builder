import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"

import {
  WelcomeWidget,
  QuickCreateWidget,
  RecentDocumentsWidget,
} from "@/components/dashboard/widgets"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }
  
  // To simulate empty state, you can pass an empty array to RecentDocumentsWidget
  // <RecentDocumentsWidget documents={[]} />
  
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-8">
      <WelcomeWidget user={session.user} />
      {/* Optional: <StatCardsWidget /> */}
      <QuickCreateWidget />
      <RecentDocumentsWidget documents={[1, 2, 3]} />
    </div>
  )
}
