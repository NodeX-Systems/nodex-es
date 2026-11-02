// Single source of truth for per-locale route paths and nav label strings.
// SiteHeader, MobileNav, SiteFooter and every page.tsx that links internally
// must import ROUTES / NAV_LABELS from here rather than hand-writing locale
// path strings or label text independently.
//
// English is the default locale and lives at the root; Spanish lives under
// /es. Slugs are identical in both locales.

export type Locale = "en" | "es";

const PATHS = {
  home: "/",
  services: "/services/",
  // The four service formats are sections of the services page.
  svcShipAi: "/services/#f-ship",
  svcEmbed: "/services/#f-embed",
  svcBuild: "/services/#f-build",
  svcUnblock: "/services/#f-unblock",
  howWeWork: "/how-we-work/",
  industries: "/industries/",
  careers: "/careers/",
  insights: "/insights/",
  insightsArticles: "/insights/#ins-articles",
  insightsReports: "/insights/#ins-reports",
  clientStories: "/client-stories/",
  caseSonnedix: "/client-stories/sonnedix/",
  caseSaas: "/client-stories/saas-platform/",
  news: "/news/",
  guide: "/forward-deployed-engineering/",
  about: "/about/",
  partners: "/partners/",
  security: "/security/",
  contact: "/contact/",
  legal: "/legal/",
  legalNotice: "/legal/#legal-notice",
  privacy: "/legal/#privacy",
  cookies: "/legal/#cookies",
  accessibility: "/legal/#access",
} as const;

export type RouteKey = keyof typeof PATHS;

// Keys that are real pages (anything with a `#` is a section of one).
export type PageKey = {
  [K in RouteKey]: (typeof PATHS)[K] extends `${string}#${string}` ? never : K;
}[RouteKey];

function withPrefix(prefix: string): typeof PATHS {
  return Object.fromEntries(
    Object.entries(PATHS).map(([key, path]) => [
      key,
      path === "/" ? `${prefix}/` : `${prefix}${path}`,
    ]),
  ) as typeof PATHS;
}

export const ROUTES: Record<Locale, typeof PATHS> = {
  en: PATHS,
  es: withPrefix("/es"),
};

// "/about/" in one locale is "/es/about/" in the other.
export function switchLocalePath(pathname: string, target: Locale) {
  const bare = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  // The shared 404 has no counterpart in the other locale: go to its home.
  const path = bare.startsWith("/_not-found") ? "/" : bare.endsWith("/") ? bare : `${bare}/`;
  if (target === "en") return path;
  return path === "/" ? "/es/" : `/es${path}`;
}

export function localeFromPath(pathname: string): Locale {
  return /^\/es(\/|$)/.test(pathname) ? "es" : "en";
}

export const NAV_LABELS = {
  es: {
    services: "Servicios",
    formats: "Formatos",
    approach: "Enfoque",
    allServices: "Todos los servicios",
    svcShipAi: "Ship AI",
    svcEmbed: "Embed",
    svcBuild: "Build",
    svcUnblock: "Unblock",
    howWeWork: "Cómo trabajamos",
    industries: "Industrias",
    careers: "Carreras",
    insights: "Insights",
    allInsights: "Todos los insights",
    articles: "Artículos",
    reports: "Informes",
    clientStories: "Casos de cliente",
    guide: "¿Qué es Forward Deployed Engineering?",
    news: "Noticias y prensa",
    company: "Empresa",
    about: "Nosotros",
    partners: "Partners",
    security: "Seguridad y confianza",
    contact: "Contacto",
    requestCall: "Solicitar llamada",
    scopingCall: "Solicitar llamada de alcance",
    press: "Prensa",
    legalNotice: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    accessibility: "Accesibilidad",
    cookiePrefs: "Preferencias de cookies",
    footerServices: "Servicios",
    footerInsights: "Insights",
    footerCompany: "Empresa",
    tagline: "Ingeniería de IA empresarial para un impacto de negocio medible.",
    location: "Valencia, España",
    rights: "Todos los derechos reservados.",
    menu: "Menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    skipToContent: "Saltar al contenido",
  },
  en: {
    services: "Services",
    formats: "Formats",
    approach: "Approach",
    allServices: "All services",
    svcShipAi: "Ship AI",
    svcEmbed: "Embed",
    svcBuild: "Build",
    svcUnblock: "Unblock",
    howWeWork: "How we work",
    industries: "Industries",
    careers: "Careers",
    insights: "Insights",
    allInsights: "All insights",
    articles: "Articles",
    reports: "Reports",
    clientStories: "Client stories",
    guide: "What is Forward Deployed Engineering?",
    news: "News and press",
    company: "Company",
    about: "About",
    partners: "Partners",
    security: "Security and trust",
    contact: "Contact",
    requestCall: "Request a call",
    scopingCall: "Request a scoping call",
    press: "Press",
    legalNotice: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",
    accessibility: "Accessibility",
    cookiePrefs: "Cookie preferences",
    footerServices: "Services",
    footerInsights: "Insights",
    footerCompany: "Company",
    tagline: "Engineering enterprise AI for measurable business impact.",
    location: "Valencia, Spain",
    rights: "All rights reserved.",
    menu: "Menu",
    closeMenu: "Close menu",
    language: "Language",
    skipToContent: "Skip to content",
  },
} as const;
