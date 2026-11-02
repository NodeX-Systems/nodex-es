import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

import NewsTemplate from "@/components/templates/NewsTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "news",
  title: "News and press — Nodex in the media | Nodex",
  description:
    "Announcements, interviews and resources for journalists.",
});

export default function Page() {
  if (!FEATURES.news) notFound();
  return <NewsTemplate locale="en" />;
}
