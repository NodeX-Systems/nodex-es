import type { Metadata } from "next";

import LegalTemplate from "@/components/templates/LegalTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "legal",
  title: "Legal — Aviso legal, privacidad, cookies y accesibilidad | Nodex",
  description:
    "Aviso legal, política de privacidad, política de cookies y declaración de accesibilidad de Nodex.",
});

export default function Page() {
  return <LegalTemplate locale="es" />;
}
