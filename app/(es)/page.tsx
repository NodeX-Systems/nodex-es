import type { Metadata } from "next";
import HomeTemplate from "@/components/templates/HomeTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const title = "NodeX - Equipos Técnicos";
const description =
  "NodeX integra equipos IT senior en tu negocio de forma inmediata para acelerar desarrollo, productos y plataformas estratégicas.";
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
};

export default function HomePage() {
  return <HomeTemplate locale="es" />;
}
