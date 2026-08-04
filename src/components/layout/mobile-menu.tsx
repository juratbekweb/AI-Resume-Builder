"use client";

import * as React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileDrawer } from "./mobile-drawer";
import { NavLinks } from "./nav-links";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-surface-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="right">
        <div className="flex flex-col gap-6 h-full">
          <NavLinks 
            className="flex-col items-start gap-4 w-full" 
            itemClassName="w-full text-base py-2 border-b border-border/10"
            onLinkClick={() => setIsOpen(false)} 
          />
          <div className="flex flex-col gap-3 mt-auto pb-4">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="ghost" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full justify-center">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </MobileDrawer>
    </div>
  );
}
