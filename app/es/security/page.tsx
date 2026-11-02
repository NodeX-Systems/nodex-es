import type { Metadata } from "next";

import SecurityTemplate from "@/components/templates/SecurityTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "security",
  title: "Seguridad y datos — Cómo protegemos tus sistemas | Nodex",
  description:
    "Lo que suelen preguntar los equipos de seguridad, legal y compras antes de empezar.",
});

export default function Page() {
  return <SecurityTemplate locale="es" />;
}
