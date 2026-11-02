import type { Metadata } from "next";

import HomeTemplate from "@/components/templates/HomeTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "home",
  title: "Nodex — Ingeniería de IA empresarial para un impacto de negocio medible",
  description:
    "Forward Deployed Engineers que se integran en tu equipo, trabajan en tu stack y se quedan hasta que la IA funciona en producción.",
});

export default function Page() {
  return <HomeTemplate locale="es" />;
}
