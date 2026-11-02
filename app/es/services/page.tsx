import type { Metadata } from "next";

import ServicesTemplate from "@/components/templates/ServicesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "services",
  title: "Servicios — Una forma de trabajar, cuatro formas de empezar | Nodex",
  description:
    "Ship AI, Embed, Build y Unblock: cuatro formatos para empezar con Forward Deployed Engineers dentro de tu equipo.",
});

export default function Page() {
  return <ServicesTemplate locale="es" />;
}
