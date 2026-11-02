import type { Metadata } from "next";

import CaseStoryTemplate from "@/components/templates/CaseStoryTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "caseSaas",
  title: "Plataforma SaaS — Más rápida de cargar, más barata de operar | Nodex",
  description:
    "Una plataforma SaaS cuyo rendimiento y factura cloud frenaban el producto. Optimizamos la plataforma y sus algoritmos.",
});

export default function Page() {
  return <CaseStoryTemplate locale="es" caseId="saas" />;
}
