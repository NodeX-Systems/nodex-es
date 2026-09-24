import type { Metadata } from "next";
import ServiceLeadershipTemplate from "@/components/templates/ServiceLeadershipTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.en;
const canonicalPath = routes.svcLeadership;
const title = "NodeX || Technical Leadership";
const description =
  "Business efficiency and digitalisation programme: NodeX analyses your operations and embeds senior technical talent to build the tools your business needs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}${canonicalPath}`,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${canonicalPath}`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function ServiceTechnicalLeadershipPage() {
  return <ServiceLeadershipTemplate locale="en" />;
}
