"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import LangSwitch from "@/components/site/LangSwitch";
import { barePath, isActive, type NavGroup } from "@/components/site/nav";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/routes";

// <= 960px: hamburger (44x44, bars morph into an X) that opens a full-screen
// panel below the header. Services/Insights/Company are +/- accordions (the
// current section starts open), Careers is a direct link, EN/ES at the end.
// Closes on Escape (focus returns to the button), on choosing a link and on
// route change.
export default function MobileNav({
  groups,
  locale,
  labels,
}: {
  groups: readonly NavGroup[];
  locale: Locale;
  labels: { menu: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const path = barePath(pathname);

  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // The hamburger disappears at 961px (a tablet turned sideways, a resized
    // window): close, or the scroll lock would outlive the menu.
    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      html.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <div className="min-[961px]:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={labels.menu}
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-11 items-center justify-center rounded-full border border-line-strong"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute h-px w-[18px] bg-ink transition-transform duration-250",
            open ? "translate-y-0 rotate-45" : "-translate-y-[2.25px]",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute h-px w-[18px] bg-ink transition-transform duration-250",
            open ? "translate-y-0 -rotate-45" : "translate-y-[2.25px]",
          )}
        />
      </button>

      <div
        id={panelId}
        inert={!open}
        onClick={(e) => {
          if ((e.target as Element).closest("a[href]")) setOpen(false);
        }}
        className={cn(
          "fixed inset-x-0 top-[var(--hh)] bottom-0 z-[29] overflow-y-auto overscroll-contain bg-canvas px-[var(--hpad)] pt-2 pb-10 transition-opacity duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul>
          {groups.map((group) =>
            group.columns ? (
              <li key={group.label} className="border-b border-line">
                <details open={isActive(group, path)} className="group/acc">
                  <summary className="flex h-14 items-center justify-between font-display text-[22px] font-semibold text-ink">
                    {group.label}
                    <span aria-hidden="true" className="relative size-4">
                      <span className="absolute top-1/2 left-0 h-px w-full bg-ink" />
                      <span className="absolute top-0 left-1/2 h-full w-px bg-ink transition-transform duration-250 group-open/acc:rotate-90" />
                    </span>
                  </summary>
                  <ul className="pb-3">
                    {group.columns.flatMap((col) => col.links).map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex h-11 items-center text-[17px] font-medium text-body"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {group.footerLink ? (
                      <li>
                        <Link
                          href={group.footerLink.href}
                          className="flex h-11 items-center text-[17px] font-medium text-ink"
                        >
                          {group.footerLink.label} →
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={group.href} className="border-b border-line">
                <Link
                  href={group.href}
                  className="flex h-14 items-center font-display text-[22px] font-semibold text-ink"
                >
                  {group.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <LangSwitch
          locale={locale}
          label={labels.language}
          className="mt-4 -ml-2"
        />
      </div>
    </div>
  );
}
