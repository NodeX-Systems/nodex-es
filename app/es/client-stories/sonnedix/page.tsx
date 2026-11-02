import type { Metadata } from "next";

import CaseStoryTemplate from "@/components/templates/CaseStoryTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "caseSonnedix",
  title: "Sonnedix — Una capa de datos, IA encima, con guardrails | Nodex",
  description:
    "Una única fuente de verdad para todos los departamentos, con pipelines RAG y agentes que van de la evaluación de riesgos al borrador de notificaciones, bajo revisión humana.",
});

export default function Page() {
  return <CaseStoryTemplate locale="es" caseId="sonnedix" />;
}
