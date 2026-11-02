"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { barePath, isActive, type NavGroup } from "@/components/site/nav";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const CLOSE_DELAY = 160;

// Desktop navigation (>= 961px). Dropdowns open on hover (and on click for
// touch), close 160ms after the pointer leaves, on Escape (focus returns to
// the button), on an outside click, on choosing a link and when focus leaves
// the group. The group of the current page stays underlined.
export default function HeaderNav({ groups }: { groups: readonly NavGroup[] }) {
  const path = barePath(usePathname());
  const [open, setOpen] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = () => clearTimeout(timer.current);
  const closeSoon = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  useEffect(() => {
    if (open === null) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="hidden min-[961px]:block"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open !== null) {
          buttons.current[open]?.focus();
          setOpen(null);
        }
      }}
    >
      <ul className="flex items-center gap-[10px] min-[961px]:max-[1200px]:gap-0.5">
        {groups.map((group, i) => {
          const active = isActive(group, path);
          const linkClass = cn(
            "relative flex h-[43px] items-center gap-1.5 px-[14px] font-sans text-[15px] font-medium transition-colors duration-200 after:absolute after:right-[14px] after:bottom-1.5 after:left-[14px] after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-250",
            active
              ? "text-ink after:scale-x-100"
              : "text-body after:scale-x-0 hover:text-ink hover:after:scale-x-100",
          );

          if (!group.columns) {
            return (
              <li key={group.href}>
                <Link
                  href={group.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass}
                >
                  {group.label}
                </Link>
              </li>
            );
          }

          const isOpen = open === i;
          return (
            <li
              key={group.label}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") {
                  cancelClose();
                  setOpen(i);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") closeSoon();
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpen((cur) => (cur === i ? null : cur));
                }
              }}
            >
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={linkClass}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {group.label}
                <ChevronDownIcon
                  className={cn(
                    "text-[12px] transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "absolute top-full z-40 pt-2 transition-[opacity,transform,visibility] duration-[180ms] ease-in-out",
                  group.alignRight ? "right-0" : "left-1/2 -translate-x-1/2",
                  isOpen
                    ? "visible opacity-100"
                    : "invisible -translate-y-1.5 opacity-0",
                  group.alignRight && !isOpen && "-translate-y-1.5",
                )}
              >
                <div
                  onClick={(e) => {
                    if ((e.target as Element).closest("a")) setOpen(null);
                  }}
                  className={cn(
                    "rounded-2xl border border-line-strong bg-canvas p-2.5 shadow-[0_22px_50px_rgba(6,14,18,0.14)]",
                    group.columns.length > 1 ? "w-[440px]" : "min-w-[240px]",
                  )}
                >
                  <div
                    className={cn(
                      "grid gap-x-2",
                      group.columns.length > 1 && "grid-cols-2",
                    )}
                  >
                    {group.columns.map((col, c) => (
                      <div key={c}>
                        {col.title ? (
                          <p className="t-tag px-3 pt-2 pb-1 text-body">{col.title}</p>
                        ) : null}
                        <ul>
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block rounded-[10px] px-3 py-2.5 font-display text-[15.5px] font-semibold text-ink transition-colors hover:bg-card focus-visible:bg-card"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {group.footerLink ? (
                    <Link
                      href={group.footerLink.href}
                      className="mt-1 block rounded-[10px] px-3 py-2.5 text-[14px] font-medium text-body transition-colors hover:bg-card hover:text-ink"
                    >
                      {group.footerLink.label} →
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
