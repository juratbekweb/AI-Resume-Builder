import { LanguageForm } from "@/components/dashboard/settings/language-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsLanguagePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Language" 
        description="Manage your language preferences."
      />
      <LanguageForm />
    </div>
  )
}
