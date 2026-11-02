import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES, type Locale, type PageKey } from "@/lib/routes";

const OG_LOCALE = { es: "es_ES", en: "en_US" } as const;

// Canonical + hreflang + Open Graph for one page in one locale. Every
// page.tsx calls this instead of hand-writing `alternates` / `openGraph`.
export function pageMetadata({
  locale,
  route,
  title,
  description,
  noIndex,
}: {
  locale: Locale;
  route: PageKey;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}${ROUTES[locale][route]}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${ROUTES.en[route]}`,
        es: `${SITE_URL}${ROUTES.es[route]}`,
        "x-default": `${SITE_URL}${ROUTES.en[route]}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
    },
    ...(noIndex ? { robots: { index: false } } : {}),
  };
}
