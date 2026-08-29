import { AppearanceForm } from "@/components/dashboard/settings/appearance-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Appearance" 
        description="Customize the look and feel of your dashboard."
      />
      <AppearanceForm />
    </div>
  )
}
