// Window event fired by instrumentation-client.ts at the start of every
// client-side navigation (Link click, router.push/replace, back/forward).
// `detail` is the destination URL. Next.js has no matching "navigation
// finished" hook, so listeners detect the end by watching usePathname().
export const NAV_START_EVENT = "nodex:nav-start";

export type NavStartEvent = CustomEvent<string>;

// "/about/" and "/about" are the same page (trailingSlash is on).
export function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
