"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavConfig } from "@/config/navigation";

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  onLinkClick?: () => void;
}

export function NavLinks({ className, itemClassName, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {mainNavConfig.map((item) => {
        // Simplified active state check. For hash links on a single page, 
        // a more complex IntersectionObserver approach would be needed for perfect scroll-spy.
        // We'll highlight if it's strictly the current route.
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1",
              isActive ? "text-primary" : "text-foreground-secondary",
              itemClassName
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
