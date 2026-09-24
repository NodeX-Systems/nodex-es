// Single source of truth for per-locale route paths and nav label strings.
// Header.tsx, MobileNav.tsx, Footer.tsx and every page.tsx that links
// internally must import ROUTES / NAV_LABELS from here rather than
// hand-writing locale path strings or label text independently.

export type Locale = "es" | "en";

export const ROUTES = {
  es: {
    home: "/",
    about: "/about/",
    contact: "/contact/",
    jobs: "/job-application/",
    svcEmbedded: "/service-embedded-development/",
    svcPlatform: "/service-platform-engineering/",
    svcLeadership: "/service-technical-leadership/",
  },
  en: {
    home: "/en/",
    about: "/en/about/",
    contact: "/en/contact/",
    jobs: "/en/job-application/",
    svcEmbedded: "/en/service-embedded-development/",
    svcPlatform: "/en/service-platform-engineering/",
    svcLeadership: "/en/service-technical-leadership/",
  },
} as const;

export const NAV_LABELS = {
  es: {
    home: "Inicio",
    homeTrailingSpace: "Inicio ",
    services: "Servicios",
    svcEmbedded: "Equipo integrado",
    svcPlatform: "Producto adhoc",
    svcLeadership: "Consultoria tech",
    about: "Nosotros",
    aboutUs: "Quiénes Somos",
    contact: "Contacto",
    contactUs: "Contáctanos",
    jobs: "Únete",
    quickLinks: "Accesos Rápidos",
    explore: "Explorar",
    ourLocation: "Nuestra Ubicación",
    tagline:
      "Talento técnico senior, integrado donde la ejecución importa.",
  },
  en: {
    home: "Home",
    homeTrailingSpace: "Home ",
    services: "Services",
    svcEmbedded: "Embedded Development",
    svcPlatform: "Platform Engineering",
    svcLeadership: "Technical Leadership",
    about: "About",
    aboutUs: "About Us",
    contact: "Contact",
    contactUs: "Contact Us",
    jobs: "Join Us",
    quickLinks: "Quick Links",
    explore: "Explore",
    ourLocation: "Our Location",
    tagline: "Senior technical talent, embedded where execution matters.",
  },
} as const;
