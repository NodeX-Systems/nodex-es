import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import PartnersTemplate from "@/components/templates/PartnersTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "partners",
  title: "Partners — The technology we build on | Nodex",
  description:
    "We choose technology for each client's context, not for a partnership. These are the platforms and partners we work with.",
});

export default function Page() {
  if (!FEATURES.partners) notFound();
  return <PartnersTemplate locale="en" />;
}
