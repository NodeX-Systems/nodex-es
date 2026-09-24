// Fires at the start of every client-side navigation (Link click, back/
// forward, router.push/replace) -- see components/NavigationLoader.tsx,
// which listens for the matching "nodex:nav-start" event to decide whether
// to show the preloader overlay for a slow navigation. There is no
// corresponding "transition complete" hook in Next.js 16, so the "end" of
// a navigation is detected separately, by watching the pathname change.
export function onRouterTransitionStart() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("nodex:nav-start"));
  }
}
