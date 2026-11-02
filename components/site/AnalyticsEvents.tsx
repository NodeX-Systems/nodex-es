"use client";

import { useEffect } from "react";
import { CTA_FROM_KEY, track } from "@/lib/analytics";

// `cta_click` (spec §4.12): any link to the contact page ("Request a call",
// "Request a scoping call", "Start here"...). `topic` is the format when the
// link carries one; `where` is the section the link sits in.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const path = url.pathname.replace(/^\/es(?=\/|$)/, "");
      if (!/^\/contact\/?$/.test(path)) return;
      try {
        sessionStorage.setItem(
          CTA_FROM_KEY,
          window.location.pathname.replace(/^\/es(?=\/|$)/, "") || "/",
        );
      } catch {
        // storage can be blocked (private mode); the origin is then unknown
      }
      const section = link.closest("section[id], header, footer, nav");
      track("cta_click", {
        cta: "request_call",
        topic: url.searchParams.get("format") ?? "general",
        where: section?.id || section?.tagName.toLowerCase() || "page",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
