import type { Metadata } from "next";

import ClientStoriesTemplate from "@/components/templates/ClientStoriesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "clientStories",
  title: "Casos de cliente — Trabajo en producción | Nodex",
  description:
    "Sistemas que hemos construido dentro de los equipos de nuestros clientes, desde agentes de IA hasta plataformas de datos.",
});

export default function Page() {
  return <ClientStoriesTemplate locale="es" />;
}
