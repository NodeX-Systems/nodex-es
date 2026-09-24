// Single source of truth for repeated literal values across the NodeX site.
// Every component/page must import from here instead of re-typing any of
// these values inline.

export const SITE_NAME = "NodeX";

// Canonical base domain, used for canonical URLs / Open Graph metadata.
export const SITE_URL = "https://www.nodex.es";

export const GA_MEASUREMENT_ID = "G-S2N672Q7WR";

export const CONTACT_EMAIL = "info@nodex.es";

// Identical in both locales per spec, not translated.
export const LOCATION_LABEL = "Valencia (Spain)";

export const MAPS_URL = "https://maps.google.com/?q=Valencia,Spain";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/nodex-es/",
  instagram: "https://www.instagram.com/wearenodex/",
} as const;

// Both endpoints live on automation.nodex.es -- never n8n.nodex.es.
export const FORM_ENDPOINTS = {
  contact: "https://automation.nodex.es/webhook/web-contact-form",
  careers: "https://automation.nodex.es/webhook/careers-form",
} as const;

// Fixed start year for the dynamically computed copyright range.
// Footer.tsx computes `currentYear` at build time and renders
// "COPYRIGHT_START_YEAR-currentYear" (or just COPYRIGHT_START_YEAR if the
// current year has not yet passed it). This is the only literal year
// allowed anywhere in the codebase.
export const COPYRIGHT_START_YEAR = 2024;
