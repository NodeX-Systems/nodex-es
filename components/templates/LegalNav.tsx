"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Sticky index of the legal page: marks the section currently in view and
// scrolls smoothly to the chosen one. Horizontal and pinned under the header
// on small screens.
export default function LegalNav({
  items,
}: {
  items: readonly { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav
      aria-label="Legal"
      className="sticky top-24 self-start max-[760px]:top-16 max-[760px]:-mx-[18px] max-[760px]:overflow-x-auto max-[760px]:border-b max-[760px]:border-line max-[760px]:bg-canvas/95 max-[760px]:px-[18px] max-[760px]:py-3"
    >
      <ul className="flex flex-col gap-1 max-[760px]:flex-row max-[760px]:gap-5">
        {items.map((it) => (
          <li key={it.id} className="max-[760px]:shrink-0">
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={cn(
                "block border-l-2 py-1.5 pl-3 text-[15px] transition-colors max-[760px]:border-l-0 max-[760px]:pl-0",
                active === it.id
                  ? "border-brand font-medium text-ink"
                  : "border-transparent text-body hover:text-ink",
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
