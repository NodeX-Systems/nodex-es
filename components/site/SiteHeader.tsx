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

// Top bar (spec §1.5 / §2.2): logo left, nav centred, language toggle and the
// call CTA right. At <= 960px the nav collapses into the hamburger menu. The
// CTA reads "Request a call" on desktop and below 380px, and "Request a
// scoping call" in between.
export default function SiteHeader({ locale }: { locale: Locale }) {
  const l = NAV_LABELS[locale];
  const r = ROUTES[locale];
  const groups = buildNav(locale);

  return (
    <HeaderShell>
      <SkipLink label={l.skipToContent} />
      <div className="relative flex h-[76px] items-center justify-between min-[961px]:h-[84px] max-[700px]:h-16">
        <Link
          href={r.home}
          aria-label="Nodex"
          className="flex h-11 items-center"
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

        <div className="hidden min-[1201px]:absolute min-[1201px]:left-1/2 min-[1201px]:block min-[1201px]:-translate-x-1/2 min-[961px]:max-[1200px]:ml-auto min-[961px]:max-[1200px]:mr-3 min-[961px]:max-[1200px]:block">
          <HeaderNav groups={groups} />
        </div>

        <div className="flex items-center gap-2 max-[960px]:gap-3">
          <LangSwitch
            locale={locale}
            label={l.language}
            className="max-[960px]:hidden"
          />
          <ButtonLink
            href={r.contact}
            size="cta"
            icon={null}
            className="min-[961px]:min-w-[130px]"
          >
            <span className="hidden max-[379px]:inline min-[961px]:inline">
              {l.requestCall}
            </span>
            <span className="hidden min-[380px]:max-[960px]:inline">
              {l.scopingCall}
            </span>
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
