import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import NewsTemplate from "@/components/templates/NewsTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  route: "news",
  title: "Noticias y prensa — Nodex en los medios | Nodex",
  description:
    "Anuncios, entrevistas y recursos para periodistas.",
});

export default function Page() {
  if (!FEATURES.news) notFound();
  return <NewsTemplate locale="es" />;
}
