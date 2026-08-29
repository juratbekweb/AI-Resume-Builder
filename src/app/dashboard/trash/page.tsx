import { ComingSoon } from "@/components/shared/coming-soon"
import { PageHeader } from "@/components/shared/page-header"

export default function TrashPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader 
        title="Trash" 
        description="Recover deleted documents or permanently empty the trash." 
      />
      <ComingSoon 
        title="Recycle Bin" 
        description="The document recovery and permanent deletion system is being prepared for Phase 3." 
      />
    </div>
  )
}
