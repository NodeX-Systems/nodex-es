import Image from "next/image";
import Link from "next/link";
import HeaderNav from "@/components/site/HeaderNav";
import HeaderShell from "@/components/site/HeaderShell";
import LangSwitch from "@/components/site/LangSwitch";
import MobileNav from "@/components/site/MobileNav";
import SkipLink from "@/components/site/SkipLink";
import { buildNav } from "@/components/site/nav";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";
import logo from "@/public/assets/img/brand/nodex-logo-white.png";

// CTA label by width: the long "scoping call" text only where it leaves room
// next to the logo, from 380px in English and 410px in Spanish (wider text).
// Tailwind's max-[N] is exclusive (< N), so "up to 960px" is max-[961px]: the
// exact complement of min-[961px], with no 1px width where neither applies.
const CTA_LABEL = {
  en: {
    short: "min-[380px]:max-[961px]:hidden",
    long: "hidden min-[380px]:max-[961px]:inline",
  },
  es: {
    short: "min-[410px]:max-[961px]:hidden",
    long: "hidden min-[410px]:max-[961px]:inline",
  },
} as const;

// Top bar (spec §1.5 / §2.2): logo left, nav centred, language toggle and the
// call CTA right. At <= 960px the nav collapses into the hamburger menu. The
// CTA reads "Request a call" on desktop and on small phones, and "Request a
// scoping call" in between.
export default function SiteHeader({ locale }: { locale: Locale }) {
  const l = NAV_LABELS[locale];
  const r = ROUTES[locale];
  const groups = buildNav(locale);
  const cta = CTA_LABEL[locale];

  return (
    <HeaderShell>
      <SkipLink label={l.skipToContent} />
      {/* --hh includes the 1px border: the bar and the menu offset can't disagree. */}
      <div className="relative flex h-[calc(var(--hh)-1px)] items-center justify-between">
        <Link
          href={r.home}
          aria-label="Nodex"
          className="flex h-11 shrink-0 items-center"
        >
          <Image
            src={logo}
            alt="Nodex"
            priority
            width={79}
            height={26}
            className="h-[26px] w-[79px] invert"
          />
        </Link>

        <div className="hidden min-[1201px]:absolute min-[1201px]:left-1/2 min-[1201px]:block min-[1201px]:-translate-x-1/2 min-[961px]:max-[1201px]:ml-auto min-[961px]:max-[1201px]:mr-3 min-[961px]:max-[1201px]:block">
          <HeaderNav groups={groups} />
        </div>

        <div className="flex items-center gap-2 min-[360px]:max-[961px]:gap-3">
          <LangSwitch
            locale={locale}
            label={l.language}
            className="max-[961px]:hidden"
          />
          <ButtonLink
            href={r.contact}
            size="cta"
            icon={null}
            className="min-[961px]:min-w-[130px]"
          >
            <span className={cta.short}>{l.requestCall}</span>
            <span className={cta.long}>{l.scopingCall}</span>
          </ButtonLink>
          <MobileNav
            groups={groups}
            locale={locale}
            labels={{ menu: l.menu, language: l.language }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
