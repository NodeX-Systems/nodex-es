import type { ElementType, ReactNode } from "react";
import InView from "@/components/ui/InView";
import { cn } from "@/lib/cn";

// Scroll-triggered entrance animation, replacing AOS (`data-aos="..."` +
// `data-aos-duration`). Same effects, offsets and easing the site used:
// AOS.init({ offset: 100, easing: "ease-in-out", once: false,
// disable: "mobile" }). Below the md breakpoint, and for users who prefer
// reduced motion, elements render in their final state with no animation.
export type RevealEffect =
  | "fade-left"
  | "fade-right"
  | "zoom-in-up"
  | "zoom-in-left"
  | "zoom-out";

const HIDDEN: Record<RevealEffect, string> = {
  "fade-right": "opacity-0 -translate-x-[100px]",
  "fade-left": "opacity-0 translate-x-[100px]",
  "zoom-in-up": "opacity-0 translate-y-[100px] scale-60",
  "zoom-in-left": "opacity-0 translate-x-[100px] scale-60",
  "zoom-out": "opacity-0 scale-120",
};

const SHOWN =
  "data-inview:opacity-100 data-inview:translate-none data-inview:scale-none";

const STATIC =
  "max-md:opacity-100 max-md:translate-none max-md:scale-none max-md:transition-none " +
  "motion-reduce:opacity-100 motion-reduce:translate-none motion-reduce:scale-none motion-reduce:transition-none";

export default function Reveal({
  effect,
  duration = 400,
  as = "div",
  className,
  children,
}: {
  effect: RevealEffect;
  /** Transition duration in ms (the old data-aos-duration). */
  duration?: number;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <InView
      as={as}
      rootMargin="0px 0px -100px 0px"
      className={cn(
        "transition-[opacity,translate,scale] ease-in-out",
        HIDDEN[effect],
        SHOWN,
        STATIC,
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </InView>
  );
}
