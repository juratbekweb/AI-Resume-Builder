import { NotificationsForm } from "@/components/dashboard/settings/notifications-form"
import { PageHeader } from "@/components/shared/page-header"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications" 
        description="Configure how you receive notifications."
      />
      <NotificationsForm />
    </div>
  )
}
