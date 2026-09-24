import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";
import {
  CONTACT_EMAIL,
  MAPS_URL,
  LOCATION_LABEL,
  SOCIAL_LINKS,
} from "@/lib/constants";

export default function MobileNav({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const labels = NAV_LABELS[locale];

  return (
    <>
      <div className="mobile-header mobile-header-main d-block d-lg-none ">
        <div className="container-fluid">
          <div className="col-12">
            <div className="mobile-header-elements">
              <div className="mobile-logo">
                <Link href={routes.home}>
                  <img src="/assets/img/logo/header-logo.png" alt="" />
                </Link>
              </div>
              <div className="mobile-nav-icon">
                <i className="fa-duotone fa-bars-staggered"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-sidebar d-block d-lg-none">
        <div className="logo-m">
          <Link href={routes.home}>
            <img src="/assets/img/logo/header-logo.png" alt="" />
          </Link>
        </div>
        <div className="menu-close">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="mobile-nav">
          <ul>
            <li>
              <Link href={routes.home}>{labels.home}</Link>
            </li>
            <li className="mobile-menu-services">
              <a href="#">{labels.services}</a>
              <ul>
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
            </li>
            <li>
              <Link href={routes.about}>{labels.about}</Link>
            </li>
            <li>
              <Link href={routes.contact}>{labels.contact}</Link>
            </li>
            <li>
              <Link href={routes.jobs}>{labels.jobs}</Link>
            </li>
          </ul>
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
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {LOCATION_LABEL}
                </a>
              </div>
            </div>
          </div>
          <div className="contact-infos">
            <h3>{labels.ourLocation}</h3>
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
      </div>
    </>
  );
}
