import { Check, X, RefreshCw, Plus } from "lucide-react";
import { useState } from "react";

interface AISuggestionCardProps {
  originalText: string;
  suggestedText: string;
  onAccept: (text: string) => void;
  onInsert: (text: string) => void;
  onDismiss: () => void;
  onTryAgain: () => void;
}

export function AISuggestionCard({ 
  originalText, 
  suggestedText, 
  onAccept, 
  onInsert,
  onDismiss,
  onTryAgain 
}: AISuggestionCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="absolute z-50 mt-2 w-full max-w-md rounded-lg border border-cyan-500/50 bg-surface p-4 shadow-xl shadow-cyan-900/20">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase text-cyan-400">AI Suggestion</span>
        <button onClick={onDismiss} className="text-foreground-secondary hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div 
        className="mb-4 rounded border border-border bg-surface-elevated p-3 text-sm text-foreground-secondary"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* We would render a diff here if needed, but for now just show suggestion */}
        <p className={isHovering ? "line-through text-foreground-secondary mb-2" : "hidden"}>
          {originalText}
        </p>
        <p className="text-white font-medium">{suggestedText}</p>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onAccept(suggestedText)}
          className="flex flex-1 items-center justify-center gap-2 rounded bg-cyan-600 py-1.5 text-xs font-medium text-white hover:bg-cyan-500"
        >
          <Check className="h-3 w-3" /> Replace
        </button>
        <button 
          onClick={() => onInsert(suggestedText)}
          className="flex flex-1 items-center justify-center gap-2 rounded border border-cyan-600/50 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-900/50"
        >
          <Plus className="h-3 w-3" /> Insert Below
        </button>
        <button 
          onClick={onTryAgain}
          className="flex items-center justify-center rounded border border-border px-3 py-1.5 text-foreground-secondary hover:bg-slate-800 hover:text-white"
          title="Try Again"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
