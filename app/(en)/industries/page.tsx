import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import IndustriesTemplate from "@/components/templates/IndustriesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "industries",
  title: "Industries — Where we've built | Nodex",
  description:
    "Energy, banking, industry, technology, logistics and healthcare: the context changes, the way we work doesn't.",
});

export default function Page() {
  if (!FEATURES.industries) notFound();
  return <IndustriesTemplate locale="en" />;
}
