import type { Metadata } from "next";

import CareersTemplate from "@/components/templates/CareersTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "careers",
  title: "Careers — Build where the problem is | Nodex",
  description:
    "Join a senior engineering team building software and AI in production, inside our clients' teams.",
});

export default function Page() {
  return <CareersTemplate locale="en" />;
}
