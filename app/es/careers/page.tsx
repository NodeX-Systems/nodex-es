import type { Metadata } from "next";

import CareersTemplate from "@/components/templates/CareersTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "careers",
  title: "Carreras — Construye donde está el problema | Nodex",
  description:
    "Únete a un equipo de ingenieros senior que construye software e IA en producción, dentro de los equipos de los clientes.",
});

export default function Page() {
  return <CareersTemplate locale="es" />;
}
