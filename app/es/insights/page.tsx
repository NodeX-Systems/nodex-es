import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import InsightsTemplate from "@/components/templates/InsightsTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "insights",
  title: "Insights — Notas de construir IA en producción | Nodex",
  description:
    "Guías prácticas de nuestros ingenieros, casos de cliente y Nodex en los medios.",
});

export default function Page() {
  if (!FEATURES.insights) notFound();
  return <InsightsTemplate locale="es" />;
}
