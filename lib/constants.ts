// Single source of truth for repeated literal values across the NodeX site.
// Every component/page must import from here instead of re-typing any of
// these values inline.

export const SITE_NAME = "NodeX";

// Canonical base domain, used for canonical URLs / Open Graph metadata.
export const SITE_URL = "https://www.nodex.es";

export const GA_MEASUREMENT_ID = "G-S2N672Q7WR";

export const CONTACT_EMAIL = "info@nodex.es";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/nodex-es/",
  instagram: "https://www.instagram.com/wearenodex/",
} as const;

// Both endpoints live on automation.nodex.es -- never n8n.nodex.es.
export const FORM_ENDPOINTS = {
  contact: "https://automation.nodex.es/webhook/web-contact-form",
  careers: "https://automation.nodex.es/webhook/careers-form",
} as const;

// Optional integrations, off until the backend exists (brief blockers 4/4b).
// `contactPartial`: when set, the contact form saves the lead after every
// step. `booking`: when set (and FEATURES.callBooking), the time picker
// confirms a slot against it.
export const OPTIONAL_ENDPOINTS: {
  contactPartial?: string;
  booking?: string;
} = {};

// Founder LinkedIn profiles, linked from the About page (a link is only
// rendered when its URL is set).
export const FOUNDER_LINKEDIN: { miguel?: string; ivan?: string } = {
  miguel: "https://www.linkedin.com/in/miguel-romero-valero/",
  ivan: "https://www.linkedin.com/in/ivan-ruiz-rosello/",
};

// Fixed start year for the dynamically computed copyright range.
// SiteFooter.tsx computes `currentYear` at build time and renders
// "COPYRIGHT_START_YEAR-currentYear" (or just COPYRIGHT_START_YEAR if the
// current year has not yet passed it). This is the only literal year
// allowed anywhere in the codebase.
export const COPYRIGHT_START_YEAR = 2024;

// Cookie that remembers the visitor's analytics choice ("granted" | "denied").
export const CONSENT_COOKIE = "nx_consent";

// Fired on window to reopen the cookie banner ("Cookie preferences" links).
export const CONSENT_OPEN_EVENT = "nodex:consent-open";
