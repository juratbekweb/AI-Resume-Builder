import { ComingSoon } from "@/components/shared/coming-soon"
import { PageHeader } from "@/components/shared/page-header"

export default function FoldersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader 
        title="Folders" 
        description="Organize your documents into nested folders for better structure." 
      />
      <ComingSoon 
        title="Folder Organization" 
        description="The advanced folder structuring system is being prepared for Phase 3." 
      />
    </div>
  )
}
