import * as React from "react";
import { cn } from "@/lib/utils";

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {/* Base Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"
        style={{ WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)" }}
      />

      {/* Radial Gradients for Glow Effects */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[100px] opacity-60" />
      <div className="absolute left-[-10%] top-[20%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[120px] opacity-40" />
      <div className="absolute right-[-10%] top-[20%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-40" />

      {/* CSS Noise Texture (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat" 
        }} 
      />

      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
