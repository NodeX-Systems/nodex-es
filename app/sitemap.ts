import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { FEATURES } from "@/lib/features";
import { ROUTES, type PageKey } from "@/lib/routes";

export const dynamic = "force-static";

// Pages switched off in lib/features.ts are left out.
const PAGES: { key: PageKey; enabled: boolean }[] = [
  { key: "home", enabled: true },
  { key: "services", enabled: true },
  { key: "howWeWork", enabled: true },
  { key: "industries", enabled: FEATURES.industries },
  { key: "careers", enabled: true },
  { key: "insights", enabled: FEATURES.insights },
  { key: "clientStories", enabled: true },
  { key: "caseSonnedix", enabled: true },
  { key: "caseSaas", enabled: true },
  { key: "news", enabled: FEATURES.news },
  { key: "guide", enabled: true },
  { key: "about", enabled: true },
  { key: "partners", enabled: FEATURES.partners },
  { key: "security", enabled: true },
  { key: "contact", enabled: true },
  { key: "legal", enabled: true },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.filter((p) => p.enabled).flatMap(({ key }) => {
    const languages = {
      en: `${SITE_URL}${ROUTES.en[key]}`,
      es: `${SITE_URL}${ROUTES.es[key]}`,
    };
    return (["en", "es"] as const).map((locale) => ({
      url: languages[locale],
      alternates: { languages },
    }));
  });
}
