import { ReactNode } from "react";

export default function DocumentEditorLayout({ children }: { children: ReactNode }) {
  // This layout will eventually hide the standard dashboard sidebar and use a fullscreen mode
  // For now, it just wraps the content
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {children}
    </div>
  );
}
