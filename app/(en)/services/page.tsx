import type { Metadata } from "next";

import ServicesTemplate from "@/components/templates/ServicesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "services",
  title: "Services — One way of working, four ways to start | Nodex",
  description:
    "Ship AI, Embed, Build and Unblock: four ways to start with Forward Deployed Engineers inside your team.",
});

export default function Page() {
  return <ServicesTemplate locale="en" />;
}
