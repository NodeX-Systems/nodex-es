// MVP launch flags (brief "MVP de la web"). Everything is built; what is off
// here is not published: no route (404), no menu entry, no sitemap entry and
// no links. Flip a flag to publish the block exactly as designed.
export const FEATURES = {
  // Pages
  industries: false,
  insights: false,
  news: false,
  partners: false,
  // Blocks
  clientVideos: false, // home "Our clients speak for us"
  engineersTeam: false, // about "A senior engineering team" (figures + faces)
  homeStats: true, // home figures; off = statement only, no numbers
  // Client logos: false = show all 16 (provisional build); true = only those
  // with written permission (see lib/clientLogos.ts).
  onlyApprovedLogos: false,
  // Content that must not ship until real
  securityCertifications: false, // "Certifications" row (needs ISO 27001 / ENS)
  clientQuote: false, // contact / case quotes are placeholders
  formatOnePager: false, // "Download the one-pager (PDF)"
  callBooking: false, // time picker after the contact form (needs a calendar tool)
  careersChat: true, // careers: application as a chat (classic form when off)
} as const;

export type FeatureKey = keyof typeof FEATURES;
