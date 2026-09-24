import type { Metadata } from "next";
import ServiceLeadershipTemplate from "@/components/templates/ServiceLeadershipTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.es;
const canonicalPath = routes.svcLeadership;
const title = "NodeX || Consultoria tech";
const description =
  "Programa de eficiencia empresarial y digitalización: NodeX analiza tus operaciones e incorpora talento técnico senior para construir las herramientas que tu negocio necesita.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${canonicalPath}`,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default function ServiceTechnicalLeadershipPage() {
  return <ServiceLeadershipTemplate locale="es" />;
}
