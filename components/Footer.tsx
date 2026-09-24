import Image from "next/image";
import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";
import {
  CONTACT_EMAIL,
  MAPS_URL,
  LOCATION_LABEL,
  SOCIAL_LINKS,
  COPYRIGHT_START_YEAR,
} from "@/lib/constants";
import Container from "@/components/ui/Container";
import { InstagramIcon, LinkedinInIcon } from "@/components/ui/icons";
import { headingOnDark } from "@/components/ui/typography";
import footerLogo from "@/public/assets/img/logo/footer-logo.png";
import mailIcon from "@/public/assets/img/icons/footer-icon2.png";
import locationIcon from "@/public/assets/img/icons/footer-icon3.png";

// Bootstrap grid column: `.row > *` gutter + `.col-12 .col-md-6`.
const col = "w-full max-w-full shrink-0 px-3 md:w-1/2";
const title =
  "pb-6 text-[20px] leading-5 font-bold text-white max-lg:mt-4 max-lg:pt-6";
const menuLink =
  "relative inline-block py-1.5 text-[18px] leading-7 font-medium text-body-light transition-all duration-400 hover:pl-3 hover:text-mint " +
  "after:absolute after:top-2.5 after:left-0 after:h-5 after:w-0 after:bg-mint after:opacity-0 after:transition-all after:duration-400 hover:after:w-[3px] hover:after:opacity-100";
const socialLink =
  "mx-1 inline-block size-9 rounded-[36px] bg-[rgba(255,255,255,0.2)] text-center leading-9 text-white transition-all duration-400 hover:bg-mint";
const contactBox = "group mb-4 flex items-start";
const contactIcon =
  "size-[30px] rounded-full bg-[rgba(255,255,255,0.199)] text-center leading-[30px] transition-all duration-400 group-hover:bg-mint";
const contactLink =
  "ml-4 inline-block text-[18px] leading-7 font-medium text-body-light transition-all duration-400 group-hover:text-mint";

export default function Footer({
  locale,
  copyrightVariant,
}: {
  locale: Locale;
  copyrightVariant: "normal" | "hyphen";
}) {
  const routes = ROUTES[locale];
  const labels = NAV_LABELS[locale];

  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear > COPYRIGHT_START_YEAR
      ? `${COPYRIGHT_START_YEAR}-${currentYear}`
      : `${COPYRIGHT_START_YEAR}`;

  const copyrightText =
    locale === "es"
      ? copyrightVariant === "hyphen"
        ? `© Copyright ${yearRange} - NodeX. Todos los derechos reservados`
        : `© Copyright ${yearRange} NodeX. Todos los derechos reservados`
      : copyrightVariant === "hyphen"
        ? `© Copyright ${yearRange} - NodeX. All Rights Reserved`
        : `© Copyright ${yearRange} NodeX. All Rights Reserved`;

  return (
    <div className="relative bg-ink pt-20">
      <Container>
        <div className="-mx-3 flex flex-wrap">
          <div className={`${col} lg:w-1/3`}>
            <div className="lg:pr-[60px]">
              <div>
                <Link href={routes.home}>
                  <Image src={footerLogo} alt="" />
                </Link>
              </div>
              <div className="h-2.5 md:h-5" />
              <div>
                <p className={headingOnDark.p}>{labels.tagline}</p>
              </div>
              <ul className="mt-6">
                <li className="inline-block">
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
                <li className="inline-block">
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
          </div>
          <div className={`${col} lg:flex-[1_0_0%]`}>
            <div>
              <h3 className={title}>{labels.quickLinks}</h3>
              <ul>
                <li>
                  <Link href={routes.svcEmbedded} className={menuLink}>
                    {labels.svcEmbedded}
                  </Link>
                </li>
                <li>
                  <Link href={routes.svcPlatform} className={menuLink}>
                    {labels.svcPlatform}
                  </Link>
                </li>
                <li>
                  <Link href={routes.svcLeadership} className={menuLink}>
                    {labels.svcLeadership}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${col} lg:flex-[1_0_0%]`}>
            {/* The template's own `.pl-5`: 24px, only from 992px up. */}
            <div className="lg:pl-6">
              <h3 className={title}>{labels.explore}</h3>
              <ul>
                <li>
                  <Link href={routes.home} className={menuLink}>
                    {labels.homeTrailingSpace}
                  </Link>
                </li>
                <li>
                  <Link href={routes.about} className={menuLink}>
                    {labels.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link href={routes.contact} className={menuLink}>
                    {labels.contactUs}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${col} lg:w-1/4`}>
            <div>
              <h3 className={title}>{labels.contactUs}</h3>
              <div className={contactBox}>
                <div className={contactIcon}>
                  <Image src={mailIcon} alt="" />
                </div>
                <div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={contactLink}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className={contactBox}>
                <div className={contactIcon}>
                  <Image src={locationIcon} alt="" />
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
          </div>
        </div>
        <div className="h-[70px]" />
      </Container>
      <div className="relative">
        <Container>
          <p className="border-t border-[rgba(255,255,255,0.267)] py-5 text-center text-[18px] leading-7 font-medium text-body-light">
            {copyrightText}
          </p>
        </Container>
      </div>
    </div>
  );
}
