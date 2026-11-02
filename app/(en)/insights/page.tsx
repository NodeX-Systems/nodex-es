import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import InsightsTemplate from "@/components/templates/InsightsTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "insights",
  title: "Insights — Notes from building AI in production | Nodex",
  description:
    "Practical guides from our engineers, client stories and Nodex in the media.",
});

export default function Page() {
  if (!FEATURES.insights) notFound();
  return <InsightsTemplate locale="en" />;
}
