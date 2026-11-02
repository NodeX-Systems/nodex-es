import type { Metadata } from "next";

import GuideTemplate from "@/components/templates/GuideTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "guide",
  title: "¿Qué es Forward Deployed Engineering? Una guía breve | Nodex",
  description:
    "Los Forward Deployed Engineers son ingenieros senior que se integran en tu equipo, trabajan en tu stack y bajo tus reglas, y se quedan hasta que lo construido funciona en producción.",
});

export default function Page() {
  return <GuideTemplate locale="es" />;
}
