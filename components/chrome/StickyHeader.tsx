"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useScrollFlag } from "@/components/chrome/useScrollFlag";
import { prefersReducedMotion } from "@/components/chrome/navEvents";

const isScrolled = (y: number) => y >= 1;

// The desktop header bar (#header). It sits absolutely positioned over the
// top of the page and, as soon as the page is scrolled at all, turns into a
// fixed white bar with a shadow that slides down into place (the template's
// `.header-area1.sticky` + `fade-in-down` keyframes). The background/shadow
// fade-in only happens on the way in: the non-sticky state has no
// transition, so scrolling back to the top snaps back instantly.
export default function StickyHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sticky = useScrollFlag(isScrolled);

  useEffect(() => {
    const el = ref.current;
    if (!sticky || !el || prefersReducedMotion()) return;
    const slideIn = el.animate(
      [{ transform: "translate3d(0, -50px, 0)" }, { transform: "none" }],
      { duration: 1000, easing: "ease" },
    );
    return () => slideIn.cancel();
  }, [sticky]);

  return (
    <div
      ref={ref}
      id="header"
      className={cn(
        "w-full border-b border-white py-3",
        sticky
          ? "fixed top-0 left-0 z-999 bg-white shadow-[0px_20px_30px_rgba(0,0,0,0.068)] transition-all duration-300 ease-[ease-in-out] [transform:translate3d(0,0,0)]"
          : "absolute z-99 bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
