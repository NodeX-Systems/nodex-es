"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  NAV_START_EVENT,
  normalizePath,
  type NavStartEvent,
} from "@/components/chrome/navEvents";
import loaderIcon from "@/public/assets/img/logo/titel.png";

// Delay after window "load" before the first-load preloader fades out,
// and the fade duration (the template's setTimeout(500) + fadeToggle()).
const HIDE_DELAY_MS = 500;
const FADE_MS = 400;

// Client-side navigations faster than this show no loader at all (the
// common case for a static site), to avoid a flash; slower ones reveal it
// until the new route has rendered.
const SLOW_NAV_THRESHOLD_MS = 400;

type FirstLoad = "shown" | "fading" | "done";

// Full-screen white overlay with the spinning ring + logo. Rendered once in
// the root layout so it survives client-side navigations.
export default function Preloader() {
  const pathname = usePathname();
  const [firstLoad, setFirstLoad] = useState<FirstLoad>("shown");
  const [slowNav, setSlowNav] = useState(false);
  const slowNavTimer = useRef<number | undefined>(undefined);
  const currentPath = useRef(pathname);

  // First load: hide shortly after everything (images, fonts) has loaded.
  // "load" may already have fired before hydration.
  useEffect(() => {
    let fadeTimer: number | undefined;
    let doneTimer: number | undefined;
    function hide() {
      fadeTimer = window.setTimeout(() => {
        setFirstLoad("fading");
        doneTimer = window.setTimeout(() => setFirstLoad("done"), FADE_MS);
      }, HIDE_DELAY_MS);
    }
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Later navigations: arm a timer when one starts (to another page)...
  useEffect(() => {
    function onNavStart(e: Event) {
      const url = new URL((e as NavStartEvent).detail, window.location.href);
      if (normalizePath(url.pathname) === normalizePath(currentPath.current)) {
        return; // same page (e.g. a link to the current route)
      }
      window.clearTimeout(slowNavTimer.current);
      slowNavTimer.current = window.setTimeout(
        () => setSlowNav(true),
        SLOW_NAV_THRESHOLD_MS,
      );
    }
    window.addEventListener(NAV_START_EVENT, onNavStart);
    return () => {
      window.removeEventListener(NAV_START_EVENT, onNavStart);
      window.clearTimeout(slowNavTimer.current);
    };
  }, []);

  // ...and hide again once the new route is rendered.
  useEffect(() => {
    currentPath.current = pathname;
    window.clearTimeout(slowNavTimer.current);
    setSlowNav(false);
  }, [pathname]);

  const visible = firstLoad !== "done" || slowNav;
  const faded = firstLoad === "fading" && !slowNav;

  return (
    <div
      data-preloader=""
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-1000 items-center justify-center bg-white transition-opacity duration-400 ease-[cubic-bezier(0.37,0,0.63,1)]",
        visible ? "flex" : "hidden",
        faded && "opacity-0",
      )}
    >
      <div className="relative mx-auto my-10 size-[100px] rounded-full">
        <div className="relative size-[100px] animate-spin-slow rounded-full border border-x-brand border-y-transparent" />
        <div className="absolute top-1/2 left-1/2 max-w-[66px] -translate-x-1/2 -translate-y-1/2">
          <Image src={loaderIcon} alt="" loading="eager" />
        </div>
      </div>
    </div>
  );
}
