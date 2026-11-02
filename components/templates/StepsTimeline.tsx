"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

// "How we work" steps (spec A6): five steps along a progress line that grows
// with the scroll — horizontal on desktop, vertical at <= 860px. Each step
// lights up when the line reaches it. Under reduced motion the line is full.
export type Step = { when: string; title: string; text: string };

export default function StepsTimeline({ steps }: { steps: readonly Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const compute = () => {
      const vertical = window.matchMedia("(max-width: 860px)").matches;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const reach = vh * 0.75 - rect.top;
      const span = vertical ? rect.height : vh * 0.35;
      setProgress(Math.min(1, Math.max(0, reach / span)));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const last = steps.length - 1;
  return (
    <ol
      ref={list}
      className="relative grid gap-9 min-[861px]:grid-cols-5 min-[861px]:gap-6"
    >
      {/* Track + progress: horizontal at desktop, vertical on small screens */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-[5px] w-px bg-line-strong min-[861px]:top-[5px] min-[861px]:right-0 min-[861px]:bottom-auto min-[861px]:left-0 min-[861px]:h-px min-[861px]:w-auto"
      />
      <span
        aria-hidden="true"
        className="absolute top-1 left-[5px] h-[calc((100%-8px)*var(--p))] w-px bg-brand min-[861px]:top-[5px] min-[861px]:left-0 min-[861px]:h-px min-[861px]:w-[calc(100%*var(--p))]"
        style={{ "--p": progress } as CSSProperties}
      />
      {steps.map((s, i) => {
        const lit = progress >= i / last - 0.001;
        return (
          <li
            key={s.title}
            className="relative pl-8 min-[861px]:pl-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-[5px] left-0 size-[11px] rounded-full border transition-colors duration-300 min-[861px]:relative min-[861px]:top-0 min-[861px]:block",
                lit ? "border-brand bg-brand" : "border-line-strong bg-canvas",
              )}
            />
            <p className="t-tag min-[861px]:mt-6 text-body">
              {String(i + 1).padStart(2, "0")} · {s.when}
            </p>
            <h2 className="t-step mt-3">{s.title}</h2>
            <p className="mt-2 max-w-[250px] text-[15px] leading-[1.5] text-body">
              {s.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
