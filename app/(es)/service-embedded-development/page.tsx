import type { Metadata } from "next";
import ServiceEmbeddedTemplate from "@/components/templates/ServiceEmbeddedTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const path = ROUTES.es.svcEmbedded;
const canonical = `${SITE_URL}${path}`;

export const metadata: Metadata = {
  title: "NodeX || Equipo integrado",
  description:
    "Equipo técnico senior integrado en tu empresa, con seniority real desde el primer día y total flexibilidad para escalar según tus necesidades.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "NodeX || Equipo integrado",
    description:
      "Equipo técnico senior integrado en tu empresa, con seniority real desde el primer día y total flexibilidad para escalar según tus necesidades.",
    url: canonical,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default function ServiceEmbeddedDevelopmentPage() {
  return <ServiceEmbeddedTemplate locale="es" />;
}
