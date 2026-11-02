import type { ReactNode } from "react";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import type { Locale } from "@/lib/routes";

// Header + footer around the page, rendered once per locale from the locale
// layouts so pages only supply their <main> content.
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="outline-none">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
