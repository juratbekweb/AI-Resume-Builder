import { ProfileForm } from "@/components/dashboard/settings/profile-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Profile" 
        description="This is how others will see you on the site."
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <ProfileForm />
      </div>
    </div>
  )
}
