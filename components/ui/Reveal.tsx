"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// Scroll entrance animations (spec A1/A2). Content is visible without JS and
// with reduced motion; with motion, elements that start below the fold are
// hidden on mount and revealed when their top crosses the threshold.
//   kind="section": fade + 18px rise, threshold 92% of the viewport height
//   kind="item":    fade + 24px rise, 90 ms stagger by `index`, threshold 90%
type State = "idle" | "hide" | "in";

export default function Reveal({
  as,
  kind = "section",
  index = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: "section" | "item";
  index?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const threshold = kind === "section" ? 0.92 : 0.9;
    const reached = () =>
      el.getBoundingClientRect().top < window.innerHeight * threshold;

    // Only what starts below the first screen is hidden.
    if (reached()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("hide");

    const check = () => {
      if (!reached()) return;
      setState("in");
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [kind]);

  const attr = kind === "section" ? "data-rv" : "data-st";
  return (
    <Tag
      ref={ref}
      {...{ [attr]: state === "hide" ? "hide" : state === "in" ? "in" : undefined }}
      style={kind === "item" ? ({ "--i": index } as CSSProperties) : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
