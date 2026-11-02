import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import IndustriesTemplate from "@/components/templates/IndustriesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "industries",
  title: "Industrias — Dónde hemos construido | Nodex",
  description:
    "Energía, banca, industria, tecnología, logística y salud: el contexto cambia, nuestra forma de trabajar no.",
});

export default function Page() {
  if (!FEATURES.industries) notFound();
  return <IndustriesTemplate locale="es" />;
}
