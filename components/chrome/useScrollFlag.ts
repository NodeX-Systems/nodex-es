"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

// True while the window's vertical scroll offset satisfies `test`. False
// during SSR / hydration, like the original jQuery handlers before the
// first scroll event. `test` must be a module-level (stable) function.
export function useScrollFlag(test: (scrollY: number) => boolean) {
  return useSyncExternalStore(
    subscribe,
    () => test(window.scrollY),
    () => false,
  );
}
