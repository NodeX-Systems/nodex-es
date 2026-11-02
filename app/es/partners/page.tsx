import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import PartnersTemplate from "@/components/templates/PartnersTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "partners",
  title: "Partners — La tecnología sobre la que construimos | Nodex",
  description:
    "Elegimos la tecnología según el contexto de cada cliente, no por una alianza. Estas son las plataformas con las que trabajamos.",
});

export default function Page() {
  if (!FEATURES.partners) notFound();
  return <PartnersTemplate locale="es" />;
}
