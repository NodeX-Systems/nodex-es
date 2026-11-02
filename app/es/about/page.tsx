import type { Metadata } from "next";

import AboutTemplate from "@/components/templates/AboutTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "about",
  title: "Nosotros — El equipo detrás del trabajo | Nodex",
  description:
    "Nodex es un equipo de Forward Deployed Engineers con base en Valencia. Construimos software e IA que funciona en producción, dentro de los equipos de nuestros clientes.",
});

export default function Page() {
  return <AboutTemplate locale="es" />;
}
