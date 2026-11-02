import type { Metadata } from "next";

import GuideTemplate from "@/components/templates/GuideTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "guide",
  title: "What is Forward Deployed Engineering? A short guide | Nodex",
  description:
    "Forward Deployed Engineers are senior engineers who join your team, work in your stack and under your rules, and stay until what they build runs in production.",
});

export default function Page() {
  return <GuideTemplate locale="en" />;
}
