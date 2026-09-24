import Link from "next/link";
import { ROUTES, NAV_LABELS, type Locale } from "@/lib/routes";

export default function Header({ locale }: { locale: Locale }) {
  const routes = ROUTES[locale];
  const labels = NAV_LABELS[locale];

  return (
    <header>
      <div
        className="header-area header-area1 header-area-all d-none d-lg-block"
        id="header"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header-elements">
                <div className="site-logo">
                  <Link href={routes.home}>
                    <img src="/assets/img/logo/header-logo.png" alt="" />
                  </Link>
                </div>
                <div className="main-menu-ex main-menu-ex1">
                  <ul>
                    <li>
                      <Link href={routes.home}>{labels.home}</Link>
                    </li>
                    <li className="dropdown-menu-parrent">
                      <a href="#" className="main1">
                        {labels.services}{" "}
                        <i className="fa-solid fa-angle-down"></i>
                      </a>
                      <ul>
                        <li>
                          <Link href={routes.svcEmbedded}>
                            {labels.svcEmbedded}
                          </Link>
                        </li>
                        <li>
                          <Link href={routes.svcPlatform}>
                            {labels.svcPlatform}
                          </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
