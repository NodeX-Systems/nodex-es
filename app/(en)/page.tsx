import type { Metadata } from "next";

import HomeTemplate from "@/components/templates/HomeTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "home",
  title: "Nodex — Engineering enterprise AI for measurable business impact",
  description:
    "Forward Deployed Engineers who join your team, work in your stack and stay until AI runs in production.",
});

export default function Page() {
  return <HomeTemplate locale="en" />;
}
