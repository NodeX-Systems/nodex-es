"use client";

import { useEffect } from "react";

// Keeps the --cqi CSS variable (1% of the usable page width) in sync with the
// width that excludes the scrollbar, which is what the design's container
// units measure. Until it runs, CSS falls back to 1vw.
export default function ViewportUnits() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty("--cqi", `${root.clientWidth / 100}px`);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return null;
}
