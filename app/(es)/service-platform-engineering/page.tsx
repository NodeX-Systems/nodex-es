import type { Metadata } from "next";
import ServicePlatformTemplate from "@/components/templates/ServicePlatformTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.es;
const path = routes.svcPlatform;
const canonicalUrl = `${SITE_URL}${path}`;
const title = "NodeX || Producto adhoc";
const description =
  "NodeX diseña y construye plataformas y productos tecnológicos llave en mano, asumiendo la responsabilidad técnica completa desde la arquitectura hasta el mantenimiento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default function ServicePlatformEngineeringPage() {
  return <ServicePlatformTemplate locale="es" />;
}
