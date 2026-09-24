import { NAV_START_EVENT } from "@/components/chrome/navEvents";

// Fires at the start of every client-side navigation (Link click, back/
// forward, router.push/replace). components/chrome/Preloader.tsx listens
// for this event to show the preloader when a navigation is slow; it
// detects the end of the navigation itself by watching usePathname(),
// since Next.js has no "transition complete" hook.
export function onRouterTransitionStart(url: string) {
  window.dispatchEvent(new CustomEvent(NAV_START_EVENT, { detail: url }));
}
