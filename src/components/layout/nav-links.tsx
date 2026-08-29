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
    <nav className={cn("flex items-center gap-8", className)}>
      {mainNavConfig.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "relative text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md py-1 px-1",
              "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all after:duration-300 hover:after:w-full",
              isActive 
                ? "text-amber-600 dark:text-primary after:w-full " 
                : "text-foreground/80 hover:text-amber-600 dark:hover:text-primary  hover:-translate-y-0.5",
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
