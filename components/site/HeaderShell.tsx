"use client";

import type { ReactNode } from "react";
import { useScrollFlag } from "@/components/site/useScrollFlag";
import { cn } from "@/lib/cn";

const isScrolled = (y: number) => y > 10;

// The sticky bar: transparent at the top, frosted once the page has moved
// more than 10px (spec §1.1: rgba(244,246,245,.94) + hairline, 16px blur on
// desktop only). With the mobile menu open it turns opaque, so the page
// doesn't show through the bar above the panel.
export default function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useScrollFlag(isScrolled);
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b px-[var(--hpad)] transition-[background-color,border-color] duration-250 ease-in-out max-[961px]:has-[button[aria-controls][aria-expanded=true]]:bg-canvas",
        scrolled
          ? "border-line bg-canvas/[0.94] min-[961px]:backdrop-blur-[16px]"
          : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
