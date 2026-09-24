import type { Metadata } from "next";
import ServiceEmbeddedTemplate from "@/components/templates/ServiceEmbeddedTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const path = ROUTES.en.svcEmbedded;
const canonical = `${SITE_URL}${path}`;

export const metadata: Metadata = {
  title: "NodeX || Embedded Development",
  description:
    "A senior technical team embedded directly in your company, delivering real seniority from day one with full flexibility to scale as you grow.",
  alternates: {
    canonical,
  },
  openGraph: {
    title: "NodeX || Embedded Development",
    description:
      "A senior technical team embedded directly in your company, delivering real seniority from day one with full flexibility to scale as you grow.",
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function ServiceEmbeddedDevelopmentPage() {
  return <ServiceEmbeddedTemplate locale="en" />;
}
