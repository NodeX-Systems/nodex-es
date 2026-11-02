"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  CONSENT_COOKIE,
  CONSENT_OPEN_EVENT,
  GA_MEASUREMENT_ID,
} from "@/lib/constants";
import { ROUTES, localeFromPath } from "@/lib/routes";

type Choice = "granted" | "denied";

const COPY = {
  es: {
    text: "Usamos cookies esenciales para que el sitio funcione. Con tu consentimiento, también usaremos cookies de analítica.",
    more: "Política de cookies",
    accept: "Aceptar analítica",
    reject: "Solo esenciales",
  },
  en: {
    text: "We use essential cookies to run this site. With your consent, we’d also use analytics cookies.",
    more: "Cookie policy",
    accept: "Accept analytics",
    reject: "Essential only",
  },
} as const;

const MAX_AGE = 60 * 60 * 24 * 365; // 12 months, as stated in the cookie policy

function readChoice(): Choice | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}

function writeChoice(choice: Choice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

// Google Analytics cookies (_ga, _ga_<id>) have to be expired explicitly when
// the visitor withdraws consent.
function clearAnalyticsCookies() {
  const id = GA_MEASUREMENT_ID.replace(/^G-/, "");
  const host = location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of ["_ga", `_ga_${id}`]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; Path=/`;
  }
}

// Analytics only loads after an explicit "Accept". The banner shows until a
// choice is stored and can be reopened from any "Cookie preferences" link.
export default function CookieConsent() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = COPY[locale];

  // `undefined` until the cookie has been read on the client.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    // The cookie only exists in the browser, so it's read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(readChoice());
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  function decide(next: Choice) {
    writeChoice(next);
    if (next === "denied") {
      (window as unknown as Record<string, boolean>)[
        `ga-disable-${GA_MEASUREMENT_ID}`
      ] = true;
      clearAnalyticsCookies();
    } else {
      delete (window as unknown as Record<string, boolean>)[
        `ga-disable-${GA_MEASUREMENT_ID}`
      ];
    }
    setChoice(next);
    setReopened(false);
  }

  const showBanner = choice === null || (choice !== undefined && reopened);

  // While the banner is up, publish the room it takes (its height plus its
  // offset from the bottom): the footer pads itself with --consent-h so the
  // legal links can scroll clear of it, and scroll-padding keeps focused
  // controls from ending up underneath.
  const bannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const root = document.documentElement;
    const sync = () => {
      const bottom = parseFloat(getComputedStyle(banner).bottom) || 0;
      const room = `${banner.offsetHeight + bottom}px`;
      root.style.setProperty("--consent-h", room);
      root.style.scrollPaddingBottom = room;
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-h");
      root.style.removeProperty("scroll-padding-bottom");
    };
  }, [showBanner]);

  return (
    <>
      {choice === "granted" ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      {showBanner ? (
        <div
          ref={bannerRef}
          role="dialog"
          aria-label={t.more}
          className={cn(
            // Over page content (z-20 at most), under the header (30) and its
            // mobile menu panel (29), so an open menu is never covered.
            "fixed z-[25] flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[18px] border border-line-strong bg-card/[0.97] shadow-[0_18px_50px_-18px_rgba(14,21,22,0.35)]",
            // A card in the bottom-right corner...
            "right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] w-[400px] max-w-[calc(100vw-32px)] px-4 py-3.5",
            // ...and a full-width bar on phones and on short (landscape)
            // screens, where text and buttons sit side by side if they fit.
            "max-[700px]:inset-x-[max(0.75rem,env(safe-area-inset-left),env(safe-area-inset-right))] max-[700px]:w-auto max-[700px]:max-w-none max-[700px]:px-3.5 max-[700px]:py-3",
            "[@media(max-height:500px)]:inset-x-[max(0.75rem,env(safe-area-inset-left),env(safe-area-inset-right))] [@media(max-height:500px)]:w-auto [@media(max-height:500px)]:max-w-none",
          )}
        >
          <p className="flex-[1_1_280px] text-[13.5px] leading-[1.5] text-body max-[700px]:text-[13px]">
            {t.text}{" "}
            <Link
              href={ROUTES[locale].cookies}
              className="py-2 whitespace-nowrap text-ink underline underline-offset-2"
            >
              {t.more}
            </Link>
          </p>
          {/* Equal columns on phones, so both labels fit at 320px */}
          <div className="flex gap-2 max-[700px]:grid max-[700px]:grid-cols-2">
            <Button
              size="cta"
              icon={null}
              className="max-[700px]:w-full"
              onClick={() => decide("denied")}
              variant="outline"
            >
              {t.reject}
            </Button>
            <Button
              size="cta"
              icon={null}
              className="max-[700px]:w-full"
              onClick={() => decide("granted")}
            >
              {t.accept}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
