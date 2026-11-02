"use client";

import { useEffect, useRef, useState } from "react";

// Figure that counts from 0 to `value` once, when it enters the viewport
// (spec A4: 1.3 s, cubic ease-out; the "+" suffix appears at the end). With
// reduced motion the final value is shown straight away.
export default function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(0);
    setDone(false);

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1300);
        setShown(Math.round(value * (1 - (1 - t) ** 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
        else setDone(true);
      };
      frame = requestAnimationFrame(tick);
    };

    const check = () => {
      if (el.getBoundingClientRect().top >= window.innerHeight * 0.88) return;
      window.removeEventListener("scroll", check);
      run();
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => {
      window.removeEventListener("scroll", check);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {shown}
      {suffix ? <span style={{ opacity: done ? 1 : 0 }}>{suffix}</span> : null}
    </span>
  );
}
