import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SiteScripts from "@/components/SiteScripts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

// Matches the original staticwebapp.config.json responseOverrides.404 ->
// /error.html behavior, which always served the SPANISH error page
// regardless of locale. Next's global not-found.tsx mirrors that: a single
// 404 page, rendered in Spanish, reusing the normal Spanish chrome (Header /
// MobileNav / Footer as built have no deviation to layer on here -- the
// deviations described in the migration spec only apply to en/error.html,
// which this migration does not build a route for).
const title = "NodeX || 404";
const description = "Página no encontrada";
const canonical = `${SITE_URL}${ROUTES.es.home}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <>
      <SiteChrome />
      <Header locale="es" />
      <MobileNav locale="es" />

      {/*=====HERO AREA START =======*/}
      <div className="common-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="main-heading">
                <h1>Error 404</h1>
                <div className="pages-intro">
                  <Link href={ROUTES.es.home}>Inicio </Link>
                  <span>
                    <i className="fa-regular fa-angle-right"></i>
                  </span>
                  <p>Error 404</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====HERO AREA END=======*/}

      {/*=====ERROR AREA START=======*/}
      <div className="error-page sp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-page-content">
                <div className="image text-center">
                  <img src="/assets/img/others/error.png" alt="" />
                </div>
                <div className="space50"></div>
                <div className="heading1 text-center">
                  <h2> ¡Lo sentimos, página no encontrada!</h2>
                  <div className="space16"></div>
                  <p>
                    Lo sentimos, la página que buscas no existe o ha sido
                    movida. Aquí tienes algunos enlaces útiles.
                  </p>
                  <div className="space30"></div>
                  <div className="button">
                    <Link className="theme-btn1" href={ROUTES.es.home}>
                      Volver al Inicio{" "}
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*=====ERROR AREA END=======*/}

      <Footer locale="es" copyrightVariant="normal" />
      <SiteScripts hasContactForm={false} />
    </>
  );
}
