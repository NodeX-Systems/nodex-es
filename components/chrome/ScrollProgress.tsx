"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "@/components/ui/icons";
import { useScrollFlag } from "@/components/chrome/useScrollFlag";
import { prefersReducedMotion } from "@/components/chrome/navEvents";

const isPastOffset = (y: number) => y > 50;

const arrow =
  "absolute top-0 left-0 flex size-14 items-center justify-center text-[18px] transition-all duration-200 ease-linear";

// Round back-to-top button in the bottom-right corner (the template's
// `.progress-wrap`): its ring fills up as the page is scrolled, it shows
// up after 50px of scroll, and clicking it scrolls smoothly to the top.
// On hover the mint arrow cross-fades to a dark one.
export default function ScrollProgress() {
  const pathRef = useRef<SVGPathElement>(null);
  const active = useScrollFlag(isPastOffset);
  const pathname = usePathname();
  const label = pathname.startsWith("/en") ? "Back to top" : "Volver arriba";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    function update() {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      path!.style.strokeDashoffset = String(length - progress * length);
    }
    update();
    // Re-measure when the page grows (images loading, route changes).
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        })
      }
      className={cn(
        "group fixed right-[30px] bottom-[30px] block size-14 rounded-[50px] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1)] transition-all duration-200 ease-linear",
        active
          ? "visible z-99 translate-y-0 opacity-100"
          : "invisible z-1 translate-y-[15px] opacity-0",
      )}
    >
      <svg
        className="block size-full"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          className="fill-none stroke-mint stroke-4 transition-[stroke-dashoffset] duration-[10ms] ease-linear"
        />
      </svg>
      <span className={cn(arrow, "z-1 text-mint group-hover:opacity-0")}>
        <ArrowUpIcon />
      </span>
      <span className={cn(arrow, "z-2 opacity-0 group-hover:opacity-100")}>
        <ArrowUpIcon />
      </span>
    </button>
  );
}
