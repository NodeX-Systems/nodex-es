"use client";

import {
  createContext,
  use,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/components/chrome/navEvents";

// Client pieces of the mobile navigation (replaces the template's jQuery
// mobile-menu.js). The markup/content lives in components/MobileNav.tsx.

type MobileMenuState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  sidebarId: string;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const MobileMenuContext = createContext<MobileMenuState | null>(null);

function useMobileMenu() {
  const ctx = use(MobileMenuContext);
  if (!ctx) throw new Error("Mobile menu parts must be inside <MobileMenu>");
  return ctx;
}

// Shares the open/closed state between the header's menu button and the
// sidebar. Renders no DOM of its own.
export function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const sidebarId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Navigation is client-side now (no full page load to reset things), so
  // close the sidebar whenever the route changes.
  const pathname = usePathname();
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
  }

  return (
    <MobileMenuContext value={{ open, setOpen, sidebarId, toggleRef }}>
      {children}
    </MobileMenuContext>
  );
}

// The bars button in the mobile header.
export function MobileMenuOpenButton(
  props: Omit<ComponentProps<"button">, "onClick" | "ref" | "type">,
) {
  const { open, setOpen, sidebarId, toggleRef } = useMobileMenu();
  return (
    <button
      {...props}
      ref={toggleRef}
      type="button"
      aria-expanded={open}
      aria-controls={sidebarId}
      onClick={() => setOpen(true)}
    />
  );
}

// The × in the sidebar.
export function MobileMenuCloseButton(
  props: Omit<ComponentProps<"button">, "onClick" | "type">,
) {
  const { setOpen } = useMobileMenu();
  return (
    <button
      {...props}
      type="button"
      data-menu-close=""
      onClick={() => setOpen(false)}
    />
  );
}

// The off-canvas panel (`.mobile-sidebar` / `.mobile-menu-active`): slides
// in from the left while fading in. Below 992px only. Also closes on
// Escape and when one of its internal links is clicked (so a link to the
// page already shown, which doesn't change the pathname, closes it too).
export function MobileSidebar({ children }: { children: ReactNode }) {
  const { open, setOpen, sidebarId, toggleRef } = useMobileMenu();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = ref.current;
    if (!open || !panel) return;
    panel
      .querySelector<HTMLElement>("[data-menu-close]")
      ?.focus({ preventScroll: true });
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Hand focus back to the menu button if it was inside the panel.
      if (panel.contains(document.activeElement)) toggleRef.current?.focus();
    };
  }, [open, setOpen, toggleRef]);

  function onClick(e: MouseEvent<HTMLDivElement>) {
    if ((e.target as Element).closest("a[href^='/']")) setOpen(false);
  }

  return (
    <div
      ref={ref}
      id={sidebarId}
      onClick={onClick}
      className={cn(
        "fixed top-0 z-9999 block h-full w-full bg-white px-[30px] pb-10 duration-300 ease-[ease] lg:hidden",
        // Opening leaves `visibility` out of the transition so the panel is
        // focusable right away (it looks the same either way); closing
        // keeps it, so the panel stays visible while it slides out.
        open
          ? "visible left-0 max-h-full overflow-y-scroll pt-[55px] opacity-100 transition-[left,opacity,padding]"
          : "invisible -left-full pt-10 opacity-0 transition-all",
      )}
    >
      {children}
    </div>
  );
}

// jQuery's default "swing" easing.
const SWING = "cubic-bezier(0.37, 0, 0.63, 1)";

// A sidebar entry with a nested list. The whole row is the toggle (the
// template laid a full-width `.submenu-button` over the parent link) with
// a "+" drawn on the right that loses its vertical bar while open. Opening
// slides the list down (jQuery slideDown()); closing shrinks it to nothing
// while fading out (jQuery hide(400)). Starts collapsed.
export function MobileSubmenu({
  label,
  className,
  children,
}: {
  label: ReactNode;
  /** Text styles of the row, same as the sibling links. */
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  function toggle() {
    const list = listRef.current;
    if (!list) return;
    const next = !open;
    setOpen(next);

    // Continue from wherever a running animation currently is.
    const shown = list.style.display === "block";
    const now = list.getBoundingClientRect();
    const nowOpacity = Number(getComputedStyle(list).opacity);
    list.getAnimations().forEach((a) => a.cancel());
    list.style.display = "block";
    list.style.overflow = "hidden";
    const fullHeight = `${list.scrollHeight}px`;
    const fullWidth = `${list.offsetWidth}px`;
    const from = shown
      ? {
          height: `${now.height}px`,
          width: `${now.width}px`,
          opacity: nowOpacity,
        }
      : { height: "0px", width: fullWidth, opacity: 1 };
    const to = next
      ? { height: fullHeight, width: fullWidth, opacity: 1 }
      : { height: "0px", width: "0px", opacity: 0 };

    const anim = list.animate([from, to], {
      duration: prefersReducedMotion() ? 0 : 400,
      easing: SWING,
    });
    anim.onfinish = () => {
      list.style.overflow = "";
      if (!next) list.style.display = "none";
    };
  }

  return (
    <li className="relative z-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        className={cn(
          className,
          "relative w-full text-left",
          "before:absolute before:top-[22px] before:right-0 before:h-0.5 before:w-5 before:bg-black before:transition-all before:duration-300 before:ease-[ease]",
          "after:absolute after:top-3 after:right-[9px] after:h-5 after:w-0.5 after:bg-black after:transition-all after:duration-300 after:ease-[ease]",
          open && "after:invisible after:opacity-0",
        )}
      >
        {label}
      </button>
      <ul ref={listRef} id={listId} className="hidden">
        {children}
      </ul>
    </li>
  );
}
