"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Threshold below which a client-side navigation is considered "instant"
// and shows no loading indicator at all, to avoid flashing on the common
// case (static pages that resolve in a few ms). Only navigations slower
// than this (e.g. a cold cache, a slow connection) reveal the preloader.
const SLOW_NAV_THRESHOLD_MS = 400;

// Shows/hides the SAME .preloader element that SiteChrome renders (see
// components/SiteChrome.tsx) for navigations after the initial page load.
// The initial load's preloader is hidden by the legacy main.js on the
// browser's "load" event, per the original site's own behavior -- this
// component does not touch that first hide. It only reacts to SUBSEQUENT
// client-side <Link> navigations, via the "nodex:nav-start" event dispatched
// by instrumentation-client.ts's onRouterTransitionStart hook (there is no
// "transition complete" hook in Next.js 16, so the end of a navigation is
// detected here by watching usePathname() change instead).
//
// main.js hides the preloader via jQuery's fadeToggle(), which ends by
// setting an INLINE style="display: none" directly on the element -- a
// plain CSS class toggled here would lose to that inline style, so this
// sets/clears element.style.display directly instead, the same mechanism
// jQuery itself uses.
export default function NavigationLoader() {
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    function clearPendingTimer() {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    function handleNavStart() {
      clearPendingTimer();
      timerRef.current = setTimeout(() => {
        const preloader = document.querySelector<HTMLElement>(".preloader");
        if (preloader) {
          preloader.style.opacity = "1";
          preloader.style.display = "flex";
        }
        timerRef.current = null;
      }, SLOW_NAV_THRESHOLD_MS);
    }

    window.addEventListener("nodex:nav-start", handleNavStart);
    return () => {
      window.removeEventListener("nodex:nav-start", handleNavStart);
      clearPendingTimer();
    };
  }, []);

  // Runs whenever the route actually changes -- i.e. the navigation
  // finished -- and hides the preloader again, whether or not it was ever
  // shown for this navigation.
  useEffect(() => {
    if (isFirstRender.current) {
      // Skip on mount: the initial page load's preloader is managed by
      // main.js (window "load" event), not by this effect.
      isFirstRender.current = false;
      return;
    }
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const preloader = document.querySelector<HTMLElement>(".preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, [pathname]);

  return null;
}
