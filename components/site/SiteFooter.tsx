import Image from "next/image";
import Link from "next/link";
import CookiePrefsButton from "@/components/site/CookiePrefsButton";
import { buildFooterColumns } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  CONTACT_EMAIL,
  COPYRIGHT_START_YEAR,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";
import logo from "@/public/assets/img/brand/nodex-logo-white.png";

const linkClass = "text-[15px] text-ink transition-colors hover:text-body";
// Touch layouts get 44px hit areas: phones (Tailwind's max-[N] is exclusive, so
// "up to 700px" is max-[701px], as in Container) and coarse pointers, which
// also covers touch tablets where the open columns show. Mouse layouts above
// 700px keep the compact rows.
const columnLink = `${linkClass} pointer-coarse:flex pointer-coarse:min-h-11 pointer-coarse:items-center`;
// The negative margin cancels the side padding, so the text stays where it was
// and the 20px gaps still keep neighbouring hit areas apart.
const legalLink =
  "text-[12.5px] text-body transition-colors hover:text-ink max-[701px]:-mx-2.5 max-[701px]:flex max-[701px]:min-h-11 max-[701px]:items-center max-[701px]:px-2.5 pointer-coarse:-mx-2.5 pointer-coarse:flex pointer-coarse:min-h-11 pointer-coarse:items-center pointer-coarse:px-2.5";

// Claim + city + CTA, three link columns (accordions at <= 700px), socials
// and the legal line.
export default function SiteFooter({ locale }: { locale: Locale }) {
  const l = NAV_LABELS[locale];
  const r = ROUTES[locale];
  const columns = buildFooterColumns(locale);
  const currentYear = new Date().getFullYear();
  const years =
    currentYear > COPYRIGHT_START_YEAR
      ? `${COPYRIGHT_START_YEAR}-${currentYear}`
      : `${COPYRIGHT_START_YEAR}`;

  return (
    <footer className="border-t border-line">
      {/* While the cookie banner is up, CookieConsent sets --consent-h and the bottom padding grows by it, so the legal links can scroll clear of the banner */}
      <Container className="pt-12 pb-[calc(2rem_+_var(--consent-h,0px))] max-[701px]:pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-display max-w-[460px] text-[clamp(24px,calc(var(--cqi)*2.2),32px)] leading-[1.05] tracking-[-0.04em]">
            {l.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="t-tag text-body">{l.location}</span>
            <ButtonLink href={r.contact} variant="outline">
              {l.scopingCall}
            </ButtonLink>
          </div>
        </div>

        {/* Desktop: open columns */}
        <div className="mt-12 grid grid-cols-3 gap-x-8 gap-y-3 border-t border-line pt-8 max-[701px]:hidden">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="t-tag mb-4 text-body pointer-coarse:mb-1.5">{col.title}</p>
              <ul className="flex flex-col gap-3 pointer-coarse:gap-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Mobile: accordions, closed by default */}
        <div className="mt-10 hidden border-t border-line max-[701px]:block">
          {columns.map((col) => (
            <details key={col.title} className="group/f border-b border-line">
              <summary className="t-tag flex h-12 items-center justify-between text-body">
                {col.title}
                <span aria-hidden="true" className="relative size-3">
                  <span className="absolute top-1/2 left-0 h-px w-full bg-body" />
                  <span className="absolute top-0 left-1/2 h-full w-px bg-body transition-transform duration-250 group-open/f:rotate-90" />
                </span>
              </summary>
              <ul className="flex flex-col pb-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`${linkClass} flex min-h-11 items-center`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6">
          <Link href={r.home} aria-label={SITE_NAME} className="flex h-11 items-center">
            <Image
              src={logo}
              alt={SITE_NAME}
              width={73}
              height={24}
              className="h-6 w-[73px] invert"
            />
          </Link>
          {(
            [
              ["LinkedIn", SOCIAL_LINKS.linkedin],
              ["Instagram", SOCIAL_LINKS.instagram],
            ] as const
          ).map(([name, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center text-[14px] text-body transition-colors hover:text-ink"
            >
              {name}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-5 max-[701px]:gap-y-0 pointer-coarse:gap-y-0">
          <p className="text-[12.5px] text-body">
            © Copyright {years} Nodex. {l.rights}
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={legalLink}>
            {CONTACT_EMAIL}
          </a>
          {FEATURES.news ? (
            <Link href={r.news} className={legalLink}>
              {l.press}
            </Link>
          ) : null}
          <Link href={r.legalNotice} className={legalLink}>
            {l.legalNotice}
          </Link>
          <Link href={r.privacy} className={legalLink}>
            {l.privacy}
          </Link>
          <Link href={r.cookies} className={legalLink}>
            {l.cookies}
          </Link>
          <Link href={r.accessibility} className={legalLink}>
            {l.accessibility}
          </Link>
          <CookiePrefsButton className={legalLink}>
            {l.cookiePrefs}
          </CookiePrefsButton>
        </div>
      </Container>
    </footer>
  );
}
