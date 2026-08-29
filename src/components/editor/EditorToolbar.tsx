import { Download, ArrowLeft, Undo, Redo, ZoomIn, ZoomOut, Share2, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface EditorToolbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  isSaving: boolean;
  lastSaved: Date;
}

export function EditorToolbar({ title, onTitleChange, isSaving, lastSaved }: EditorToolbarProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatDistanceToNow(lastSaved, { addSuffix: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0f1c] px-4 md:px-6 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/documents"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
        <div className="flex flex-col justify-center">
          <input 
            type="text" 
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-transparent text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 rounded hover:bg-white/5 px-2 py-0.5 min-w-[150px] md:min-w-[250px] transition-colors -ml-2"
          />
          <div className="flex items-center gap-1.5 px-2 mt-0.5">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 text-cyan-400 animate-spin" />
                <span className="text-[10px] text-cyan-400 font-medium">Saving...</span>
              </>
            ) : (
              <>
                <Check className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] text-slate-500 font-medium">Saved {timeAgo}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-md p-1 border border-white/5">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10 rounded-sm">
            <Undo className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10 rounded-sm">
            <Redo className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-md p-1 border border-white/5 mr-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10 rounded-sm">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs font-medium text-slate-300 px-2">100%</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10 rounded-sm">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>

        <Button variant="outline" className="hidden sm:flex h-9 items-center gap-2 border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
          <Share2 className="h-4 w-4" /> Share
        </Button>
        <Button className="h-9 items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 border-0">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>
    </header>
  );
}
