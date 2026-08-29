import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Heart } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  href,
  badge,
  badgeColor = "text-primary bg-primary/10 border-primary/20",
  className,
  isFavorite = false,
  onToggleFavorite,
}: ToolCardProps) {
  return (
    <Link href={href} className={cn("block group h-full", className)}>
      <div className="relative h-full overflow-hidden rounded-2xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(56,189,248,0.25)]">
        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-transparent group-hover:from-primary/5 transition-colors duration-500 pointer-events-none" />
        
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors duration-300">
              <Icon className="h-6 w-6 text-foreground-secondary group-hover:text-primary transition-colors duration-300" />
            </div>
            <div className="flex items-center gap-2 z-20">
              {badge && (
                <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", badgeColor)}>
                  {badge}
                </span>
              )}
              {onToggleFavorite && (
                <button 
                  onClick={(e) => { e.preventDefault(); onToggleFavorite(e); }}
                  className="p-1.5 rounded-full hover:bg-surface-elevated border border-transparent hover:border-border transition-colors"
                >
                  <Heart className={cn("h-4 w-4 transition-colors", isFavorite ? "fill-error text-error" : "text-foreground-muted hover:text-error")} />
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-auto">
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              {title}
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
            <p className="text-sm text-foreground-secondary font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
