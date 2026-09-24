import Image from "next/image";
import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";
import {
  CONTACT_EMAIL,
  MAPS_URL,
  LOCATION_LABEL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import Container from "@/components/ui/Container";
import {
  BarsStaggeredIcon,
  InstagramIcon,
  LinkedinInIcon,
  XmarkIcon,
} from "@/components/ui/icons";
import {
  MobileMenu,
  MobileMenuCloseButton,
  MobileMenuOpenButton,
  MobileSidebar,
  MobileSubmenu,
} from "@/components/chrome/MobileMenu";
import headerLogo from "@/public/assets/img/logo/header-logo.png";
import mailIcon from "@/public/assets/img/icons/footer-icon2.png";
import locationIcon from "@/public/assets/img/icons/footer-icon3.png";

const A11Y = {
  es: { open: "Abrir menú", close: "Cerrar menú" },
  en: { open: "Open menu", close: "Close menu" },
} as const;

const navItem = "relative z-2";
const navLink = "block py-2.5 text-[18px] leading-6 text-black";
const sectionTitle = "mt-[30px] mb-4 text-[24px] leading-6 font-bold text-ink";
const contactBox = "flex items-center py-2.5";
// The template gave these links (and the social icons) colors from
// undefined CSS variables, so they simply inherit the body color, and the
// social icons' background resolves to transparent on hover.
const contactLink =
  "inline-block text-[18px] leading-7 font-medium transition-all duration-400";
const socialLink =
  "mx-0.5 inline-block size-8 rounded-full bg-[#0000000e] py-2.5 text-center text-base leading-0 transition-all duration-400 hover:bg-transparent";

// Mobile header bar + off-canvas sidebar, below 992px.
export default function MobileNav({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const labels = NAV_LABELS[locale];

  return (
    <MobileMenu>
      <div className="fixed top-0 left-0 z-999 block w-full bg-white py-[17px] lg:hidden">
        <Container fluid>
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={routes.home}
                className="text-[20px] font-bold text-black"
              >
                <Image src={headerLogo} alt="" loading="eager" />
              </Link>
            </div>
            <MobileMenuOpenButton
              aria-label={A11Y[locale].open}
              className="flex size-10 items-center justify-center rounded-[4px] border text-[23px] text-black"
            >
              <BarsStaggeredIcon />
            </MobileMenuOpenButton>
          </div>
        </Container>
      </div>

      <MobileSidebar>
        <div className="-mt-10 mb-[30px]">
          <Link href={routes.home}>
            <Image src={headerLogo} alt="" loading="eager" />
          </Link>
        </div>
        <MobileMenuCloseButton
          aria-label={A11Y[locale].close}
          className="absolute top-5 right-5 w-5 text-center text-[25px] text-black"
        >
          <XmarkIcon />
        </MobileMenuCloseButton>
        <nav>
          <ul>
            <li className={navItem}>
              <Link href={routes.home} className={navLink}>
                {labels.home}
              </Link>
            </li>
            <MobileSubmenu label={labels.services} className={navLink}>
              <li className={navItem}>
                <Link href={routes.svcEmbedded} className={navLink}>
                  {labels.svcEmbedded}
                </Link>
              </li>
              <li className={navItem}>
                <Link href={routes.svcPlatform} className={navLink}>
                  {labels.svcPlatform}
                </Link>
              </li>
              <li className={navItem}>
                <Link href={routes.svcLeadership} className={navLink}>
                  {labels.svcLeadership}
                </Link>
              </li>
            </MobileSubmenu>
            <li className={navItem}>
              <Link href={routes.about} className={navLink}>
                {labels.about}
              </Link>
            </li>
            <li className={navItem}>
              <Link href={routes.contact} className={navLink}>
                {labels.contact}
              </Link>
            </li>
            <li className={navItem}>
              <Link href={routes.jobs} className={navLink}>
                {labels.jobs}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className={sectionTitle}>{labels.contactUs}</h3>
          <div className={contactBox}>
            <div className="mr-4">
              <Image
                src={mailIcon}
                alt=""
                loading="eager"
                className="brightness-0"
              />
            </div>
            <div>
              <a href={`mailto:${CONTACT_EMAIL}`} className={contactLink}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className={contactBox}>
            <div className="mr-4">
              <Image
                src={locationIcon}
                alt=""
                loading="eager"
                className="brightness-0"
              />
            </div>
            <div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLink}
              >
                {LOCATION_LABEL}
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className={sectionTitle}>{labels.ourLocation}</h3>
          <ul className="pt-6">
            <li className={`${navItem} inline-block`}>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLink}
              >
                <LinkedinInIcon />
              </a>
            </li>
            <li className={`${navItem} inline-block`}>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialLink}
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </MobileSidebar>
    </MobileMenu>
  );
}
