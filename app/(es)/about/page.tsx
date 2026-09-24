import type { Metadata } from "next";
import AboutTemplate from "@/components/templates/AboutTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const title = "NodeX || Nosotros";
const description =
  "Conoce al equipo de NodeX: talento técnico senior que se integra en tu organización para ejecutar con criterio desde el primer día.";
const canonical = `${SITE_URL}${ROUTES.es.about}`;

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
};

export default function AboutPage() {
  return <AboutTemplate locale="es" />;
}
