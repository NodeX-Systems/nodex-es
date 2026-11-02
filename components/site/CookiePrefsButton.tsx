"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/constants";

// "Cookie preferences" link: reopens the consent banner.
export default function CookiePrefsButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      {children}
    </button>
  );
}
