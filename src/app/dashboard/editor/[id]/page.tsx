import { getDocumentForEditor } from "@/actions/document-actions";
import { notFound } from "next/navigation";
import { DocumentEditorClient } from "@/components/editor/DocumentEditorClient";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let document;
  try {
    document = await getDocumentForEditor(id);
  } catch (_error) {
    notFound();
  }
  
  return <DocumentEditorClient initialDocument={document} />;
}
