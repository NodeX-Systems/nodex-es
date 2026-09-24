import type { Metadata } from "next";
import ServicePlatformTemplate from "@/components/templates/ServicePlatformTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.en;
const path = routes.svcPlatform;
const canonicalUrl = `${SITE_URL}${path}`;
const title = "NodeX || Platform Engineering";
const description =
  "NodeX designs and builds turnkey platforms and technology products, taking full technical ownership from architecture through to ongoing maintenance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function ServicePlatformEngineeringPage() {
  return <ServicePlatformTemplate locale="en" />;
}
