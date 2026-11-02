"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CLIENT_LOGOS } from "@/lib/clientLogos";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/features";

const LOGOS = CLIENT_LOGOS.filter(
  (logo) => !FEATURES.onlyApprovedLogos || logo.permission === "written",
);

// The list is rendered twice and slides by exactly one copy, so it loops with
// no seam. Spacing adapts to the screen: logos keep at least the base 24px gap
// and, when the list is narrower than the strip, the gaps grow until ONE copy
// of the list is exactly as wide as the strip. A wide screen therefore shows
// each client once, evenly spread, instead of the list repeating beside
// itself.
const MIN_GAP = 24;
// Scroll speed, close to the prototype (16 logos in 110s).
const PX_PER_SECOND = 18;
const SLOW_RATE = 0.12;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

// Continuous marquee (spec B1). Hovering slows it to 12% in 450ms and
// releasing speeds it back; keyboard focus inside stops it. There is
// deliberately no pause button. Static (but still evenly spaced) under
// reduced motion.
export default function LogoStrip({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = track.current;
    const root = el?.parentElement;
    if (!el || !root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let anim: Animation | null = null;
    if (!reduced) {
      anim = el.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
        { duration: 90_000, iterations: Infinity, easing: "linear" },
      );
    }

    // Spread the logos over the strip and match the speed to the copy width.
    const layout = () => {
      const imgs = Array.from(el.querySelectorAll("img")).slice(0, LOGOS.length);
      const logosWidth = imgs.reduce((sum, img) => sum + img.getBoundingClientRect().width, 0);
      // A strip is never wider than the screen. Capping the measurement means
      // a container that somehow grew with the list cannot feed the gap back
      // into itself (the root has inline-size containment, this is the net).
      const width = Math.min(root.clientWidth, window.innerWidth);
      const gap = Math.max(MIN_GAP, (width - logosWidth) / LOGOS.length);
      if (!Number.isFinite(gap)) return;
      el.style.setProperty("--gap", `${gap}px`);
      const copyWidth = logosWidth + gap * LOGOS.length;
      anim?.effect?.updateTiming({ duration: (copyWidth / PX_PER_SECOND) * 1000 });
    };
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(root);

    const rateTo = (target: number) => {
      if (!anim) return;
      cancelAnimationFrame(frame.current);
      const from = anim.playbackRate;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 450);
        anim!.playbackRate = from + (target - from) * easeOutCubic(t);
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    };
    const enter = () => rateTo(SLOW_RATE);
    const leave = () => rateTo(1);
    const focusIn = () => rateTo(0);
    const focusOut = () => rateTo(1);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
      anim?.cancel();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
    };
  }, []);

  return (
    <div className={cn("flex items-center gap-8", className)}>
      {label ? (
        <p className="t-tag hidden max-w-[130px] shrink-0 leading-[1.4] text-body sm:block">
          {label}
        </p>
      ) : null}
      {/* contain-inline-size: the w-max list never counts towards the width of
          this box, so no grid track or flex row can grow with the logos (and
          with them the gap measured from this box). */}
      <div className="contain-inline-size max-w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul ref={track} className="flex w-max items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <li
              key={i}
              aria-hidden={i >= LOGOS.length ? true : undefined}
              className="px-[calc(var(--gap,24px)/2)]"
            >
              <Image
                src={logo.src}
                alt={i >= LOGOS.length ? "" : logo.name}
                style={{ "--k": logo.k } as CSSProperties}
                className="h-[calc(26px*var(--k))] w-auto invert opacity-70 max-[700px]:h-[calc(20px*var(--k))]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
