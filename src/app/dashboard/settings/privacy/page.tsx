import { PrivacyForm } from "@/components/dashboard/settings/privacy-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsPrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Privacy" 
        description="Manage your data and privacy preferences."
      />
      <PrivacyForm />
    </div>
  )
}
