import Image from "next/image";
import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";
import Container from "@/components/ui/Container";
import { AngleDownIcon } from "@/components/ui/icons";
import StickyHeader from "@/components/chrome/StickyHeader";
import headerLogo from "@/public/assets/img/logo/header-logo.png";

// Top-level menu entries (desktop).
const topItem = "relative z-9 inline-block";
const topLink =
  "block px-[15px] py-2 font-medium text-ink transition-all duration-300 hover:text-brand";

// The "Services" dropdown opens while its <li> is hovered, like the
// template's `.main-menu-ex li:hover > ul`. `group-[:hover]` rather than
// `group-hover` on purpose: Tailwind wraps `hover:` in
// `@media (hover: hover)`, which would stop tap-to-open on touch screens
// wide enough to get the desktop header (tablets in landscape). It also
// opens while keyboard focus is inside it.
const dropdown =
  "invisible absolute top-[50px] left-0 w-[206px] rounded-[4px] bg-white p-2.5 opacity-0 shadow-[0px_20px_30px_rgba(0,0,0,0.068)] backdrop-blur-[27px] transition-all duration-300 ease-[ease] [transform:translateY(20px)_rotateX(45deg)] " +
  "group-[:hover]:visible group-[:hover]:z-99 group-[:hover]:opacity-100 group-[:hover]:[transform:translateY(0)] " +
  "group-has-[:focus-visible]:visible group-has-[:focus-visible]:z-99 group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:[transform:translateY(0)]";

// Dropdown entries: brand color + a 5px brand bar sliding in on the left.
const dropdownLink =
  "block px-[15px] py-2 font-medium text-reboot transition-all duration-300 hover:text-brand hover:duration-400 " +
  "after:absolute after:bottom-0 after:-left-2.5 after:-z-1 after:h-full after:w-0 after:rounded-[4px] after:transition-all after:duration-400 hover:after:w-[5px] hover:after:bg-brand";

export default function Header({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const labels = NAV_LABELS[locale];

  return (
    <header>
      <StickyHeader className="hidden lg:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex max-w-[130px] items-center">
              <Link href={routes.home} className="relative z-9 inline-block">
                <Image src={headerLogo} alt="" loading="eager" />
              </Link>
            </div>
            <nav className="relative px-6 py-0.5">
              <ul>
                <li className={topItem}>
                  <Link href={routes.home} className={topLink}>
                    {labels.home}
                  </Link>
                </li>
                <li className={`group ${topItem}`}>
                  {/* Opens the dropdown on hover; not a link (was href="#"). */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-[15px] py-2 font-medium text-ink transition-all duration-300 hover:text-brand group-[:hover]:text-brand"
                  >
                    {labels.services}
                    <AngleDownIcon />
                  </button>
                  <ul className={dropdown}>
                    <li className="relative z-9 block">
                      <Link href={routes.svcEmbedded} className={dropdownLink}>
                        {labels.svcEmbedded}
                      </Link>
                    </li>
                    <li className="relative z-9 block">
                      <Link href={routes.svcPlatform} className={dropdownLink}>
                        {labels.svcPlatform}
                      </Link>
                    </li>
                    <li className="relative z-9 block">
                      <Link
                        href={routes.svcLeadership}
                        className={dropdownLink}
                      >
                        {labels.svcLeadership}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={topItem}>
                  <Link href={routes.about} className={topLink}>
                    {labels.about}
                  </Link>
                </li>
                <li className={topItem}>
                  <Link href={routes.contact} className={topLink}>
                    {labels.contact}
                  </Link>
                </li>
                <li className={topItem}>
                  <Link href={routes.jobs} className={topLink}>
                    {labels.jobs}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </StickyHeader>
    </header>
  );
}
