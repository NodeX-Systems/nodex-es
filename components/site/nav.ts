import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

export type NavLink = { label: string; href: string };

export type NavGroup = {
  label: string;
  href: string;
  /** Locale-less path prefixes that mark this group as the current section. */
  match: readonly string[];
  /** Dropdown columns (a title is optional). Absent = plain link. */
  columns?: readonly { title?: string; links: readonly NavLink[] }[];
  footerLink?: NavLink;
  alignRight?: boolean;
};

// Header navigation. Entries for features that are switched off (see
// lib/features.ts) are left out, and so are groups left empty.
export function buildNav(locale: Locale): NavGroup[] {
  const r = ROUTES[locale];
  const l = NAV_LABELS[locale];

  const approach: NavLink[] = [{ label: l.howWeWork, href: r.howWeWork }];
  if (FEATURES.industries) {
    approach.push({ label: l.industries, href: r.industries });
  }

  const insightsLinks: NavLink[] = [];
  if (FEATURES.insights) {
    insightsLinks.push(
      { label: l.articles, href: r.insightsArticles },
      { label: l.reports, href: r.insightsReports },
    );
  }
  insightsLinks.push({ label: l.guide, href: r.guide });
  if (FEATURES.news) insightsLinks.push({ label: l.news, href: r.news });
  insightsLinks.push({ label: l.clientStories, href: r.clientStories });

  const companyLinks: NavLink[] = [{ label: l.about, href: r.about }];
  if (FEATURES.partners) {
    companyLinks.push({ label: l.partners, href: r.partners });
  }
  companyLinks.push(
    { label: l.security, href: r.security },
    { label: l.contact, href: r.contact },
  );

  return [
    {
      label: l.services,
      href: r.services,
      match: ["/services", "/how-we-work", "/industries"],
      columns: [
        {
          title: l.formats,
          links: [
            { label: l.svcShipAi, href: r.svcShipAi },
            { label: l.svcEmbed, href: r.svcEmbed },
            { label: l.svcBuild, href: r.svcBuild },
            { label: l.svcUnblock, href: r.svcUnblock },
          ],
        },
        { title: l.approach, links: approach },
      ],
      footerLink: { label: l.allServices, href: r.services },
    },
    { label: l.careers, href: r.careers, match: ["/careers"] },
    {
      label: l.insights,
      href: FEATURES.insights ? r.insights : r.clientStories,
      match: [
        "/insights",
        "/news",
        "/forward-deployed-engineering",
        "/client-stories",
      ],
      columns: [{ links: insightsLinks }],
      footerLink: FEATURES.insights
        ? { label: l.allInsights, href: r.insights }
        : undefined,
    },
    {
      label: l.company,
      href: r.about,
      match: ["/about", "/partners", "/security", "/contact"],
      columns: [{ links: companyLinks }],
      alignRight: true,
    },
  ];
}

// Footer link columns.
export function buildFooterColumns(locale: Locale) {
  const r = ROUTES[locale];
  const l = NAV_LABELS[locale];

  const services: NavLink[] = [
    { label: l.svcShipAi, href: r.svcShipAi },
    { label: l.svcEmbed, href: r.svcEmbed },
    { label: l.svcBuild, href: r.svcBuild },
    { label: l.svcUnblock, href: r.svcUnblock },
    { label: l.howWeWork, href: r.howWeWork },
  ];
  if (FEATURES.industries) {
    services.push({ label: l.industries, href: r.industries });
  }

  const insights: NavLink[] = [
    { label: l.clientStories, href: r.clientStories },
    { label: l.guide, href: r.guide },
  ];
  if (FEATURES.news) insights.push({ label: l.news, href: r.news });

  const company: NavLink[] = [
    { label: l.about, href: r.about },
    { label: l.careers, href: r.careers },
  ];
  if (FEATURES.partners) company.push({ label: l.partners, href: r.partners });
  company.push(
    { label: l.security, href: r.security },
    { label: l.contact, href: r.contact },
  );

  return [
    { title: l.footerServices, links: services },
    { title: l.footerInsights, links: insights },
    { title: l.footerCompany, links: company },
  ] as const;
}

// Strips the locale prefix and trailing slash: "/es/services/" -> "/services".
export function barePath(pathname: string) {
  return pathname.replace(/^\/es(?=\/|$)/, "").replace(/\/+$/, "") || "/";
}

export function isActive(group: NavGroup, path: string) {
  return group.match.some((m) => path === m || path.startsWith(`${m}/`));
}
