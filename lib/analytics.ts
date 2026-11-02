// Pushes events to window.dataLayer (spec §4.12). Nothing is sent until the
// analytics script is loaded, which only happens after the visitor accepts
// analytics cookies.
// Page a visitor was on when they clicked a link to the contact form. Kept in
// sessionStorage because document.referrer does not change on client-side
// navigations, so it can't tell which page the CTA sat on.
export const CTA_FROM_KEY = "nx_cta_from";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, page: window.location.pathname, ...data });
}
