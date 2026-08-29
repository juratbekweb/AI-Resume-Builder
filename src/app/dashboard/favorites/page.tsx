import { ComingSoon } from "@/components/shared/coming-soon"
import { PageHeader } from "@/components/shared/page-header"

export default function FavoritesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader 
        title="Favorites" 
        description="Quickly access your most important starred documents." 
      />
      <ComingSoon 
        title="Favorites List" 
        description="The document favorite system is being prepared for Phase 3." 
      />
    </div>
  )
}
