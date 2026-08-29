import { SessionsForm } from "@/components/dashboard/settings/sessions-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsSessionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sessions" 
        description="Manage your active device sessions."
      />
      <SessionsForm />
    </div>
  )
}
