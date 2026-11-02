import type { Metadata } from "next";

import ContactTemplate from "@/components/templates/ContactTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "contact",
  title: "Solicitar una llamada de alcance — 30 minutos con un ingeniero senior | Nodex",
  description:
    "Cuéntanos el problema. En 30 minutos te decimos con honestidad si somos el equipo adecuado y cómo empezaríamos.",
});

export default function Page() {
  return <ContactTemplate locale="es" />;
}
