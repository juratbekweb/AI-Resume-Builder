import { DocumentSection } from "@prisma/client";
import { GripVertical, Plus } from "lucide-react";

interface SectionNavigatorProps {
  sections: DocumentSection[];
  activeSectionId: string | null;
  onSelectSection: (id: string) => void;
}

export function SectionNavigator({ sections, activeSectionId, onSelectSection }: SectionNavigatorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Sections</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* We would wrap this in DragDropContext eventually for reordering */}
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors text-left ${
              activeSectionId === section.id 
                ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase">{section.title || section.type}</span>
            </div>
            <GripVertical className="h-3 w-3 opacity-50 cursor-grab hover:opacity-100" />
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-2 w-full justify-center rounded-md border border-dashed border-white/20 py-2 text-xs font-medium text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
          <Plus className="h-3 w-3" /> Add Section
        </button>
      </div>
    </div>
  );
}
