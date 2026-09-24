import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";
import {
  CONTACT_EMAIL,
  MAPS_URL,
  LOCATION_LABEL,
  SOCIAL_LINKS,
  COPYRIGHT_START_YEAR,
} from "@/lib/constants";

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
    <div className="footer1 _relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="single-footer-items footer-logo-area">
              <div className="footer-logo">
                <Link href={routes.home}>
                  <img src="/assets/img/logo/footer-logo.png" alt="" />
                </Link>
              </div>
              <div className="space20"></div>
              <div className="heading1-w">
                <p>{labels.tagline}</p>
              </div>
              <ul className="social-icon">
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg col-md-6 col-12">
            <div className="single-footer-items">
              <h3>{labels.quickLinks}</h3>
              <ul className="menu-list">
                <li>
                  <Link href={routes.svcEmbedded}>{labels.svcEmbedded}</Link>
                </li>
                <li>
                  <Link href={routes.svcPlatform}>{labels.svcPlatform}</Link>
                </li>
                <li>
                  <Link href={routes.svcLeadership}>
                    {labels.svcLeadership}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg col-md-6 col-12">
            <div className="single-footer-items pl-5">
              <h3>{labels.explore}</h3>
              <ul className="menu-list">
                <li>
                  <Link href={routes.home}>{labels.homeTrailingSpace}</Link>
                </li>
                <li>
                  <Link href={routes.about}>{labels.aboutUs}</Link>
                </li>
                <li>
                  <Link href={routes.contact}>{labels.contactUs}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="single-footer-items">
              <h3>{labels.contactUs}</h3>
              <div className="contact-box">
                <div className="icon">
                  <img src="/assets/img/icons/footer-icon2.png" alt="" />
                </div>
                <div className="pera">
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
              </div>
              <div className="contact-box">
                <div className="icon">
                  <img src="/assets/img/icons/footer-icon3.png" alt="" />
                </div>
                <div className="pera">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {LOCATION_LABEL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space70"></div>
      </div>
      <div className="copyright-area _relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="coppyright">
                <p>{copyrightText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
