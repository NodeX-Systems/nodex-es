import type { Metadata } from "next";

import HowWeWorkTemplate from "@/components/templates/HowWeWorkTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "howWeWork",
  title: "Cómo trabajamos — Dentro de tu equipo en una semana | Nodex",
  description:
    "Un proceso sencillo y con criterio: entendemos, definimos, nos incorporamos, entregamos y escalamos.",
});

export default function Page() {
  return <HowWeWorkTemplate locale="es" />;
}
