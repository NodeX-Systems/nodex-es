import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { heading } from "@/components/ui/typography";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import errorImg from "@/public/assets/img/others/error.png";

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
      <Header locale="es" />
      <MobileNav locale="es" />

      {/*=====HERO AREA START =======*/}
      <PageHero
        title="Error 404"
        homeHref={ROUTES.es.home}
        homeLabel="Inicio"
        current="Error 404"
      />
      {/*=====HERO AREA END=======*/}

      {/*=====ERROR AREA START=======*/}
      <div className="py-[50px] md:py-25">
        <Container>
          <div className="text-center">
            <Image src={errorImg} alt="" />
          </div>
          <div className="h-[25px] md:h-[50px]" />
          <div className="text-center">
            <h2 className={heading.h2}> ¡Lo sentimos, página no encontrada!</h2>
            <div className="h-4" />
            <p className={heading.p}>
              Lo sentimos, la página que buscas no existe o ha sido movida.
              Aquí tienes algunos enlaces útiles.
            </p>
            <div className="h-[15px] md:h-[30px]" />
            <div>
              <ButtonLink href={ROUTES.es.home}>Volver al Inicio</ButtonLink>
            </div>
          </div>
        </Container>
      </div>
      {/*=====ERROR AREA END=======*/}

      <Footer locale="es" copyrightVariant="normal" />
    </>
  );
}
