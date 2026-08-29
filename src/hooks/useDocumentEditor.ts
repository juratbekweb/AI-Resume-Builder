import { useState, useCallback } from "react";
import { updateDocumentTitle, updateSection } from "@/actions/document-actions";
import { useDebounce } from "./useDebounce";
import { Document, DocumentSection, Prisma } from "@prisma/client";

export type FullDocument = Document & {
  sections: DocumentSection[];
};

export function useDocumentEditor(initialDocument: FullDocument) {
  const [document, setDocument] = useState<FullDocument>(initialDocument);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialDocument.sections[0]?.id || null
  );

  const debouncedSaveTitle = useDebounce(async (id: string, title: string) => {
    try {
      setIsSaving(true);
      await updateDocumentTitle(id, title);
      setLastSaved(new Date());
    } catch (e) {
      console.error("Failed to save title", e);
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  const debouncedSaveSection = useDebounce(async (sectionId: string, content: Prisma.InputJsonValue) => {
    try {
      setIsSaving(true);
      await updateSection(sectionId, content);
      setLastSaved(new Date());
    } catch (e) {
      console.error("Failed to save section", e);
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  const updateTitle = useCallback((newTitle: string) => {
    setDocument((prev) => ({ ...prev, title: newTitle }));
    debouncedSaveTitle(document.id, newTitle);
  }, [document.id, debouncedSaveTitle]);

  const updateSectionContent = useCallback((sectionId: string, content: Prisma.InputJsonValue) => {
    setDocument((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => 
        sec.id === sectionId ? { ...sec, content: content as Prisma.JsonValue } : sec
      )
    }));
    debouncedSaveSection(sectionId, content);
  }, [debouncedSaveSection]);

  const activeSection = document.sections.find(s => s.id === activeSectionId);

  return {
    document,
    isSaving,
    lastSaved,
    activeSectionId,
    setActiveSectionId,
    activeSection,
    updateTitle,
    updateSectionContent,
  };
}
