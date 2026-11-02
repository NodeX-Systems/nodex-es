import type { Metadata } from "next";

import SecurityTemplate from "@/components/templates/SecurityTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "security",
  title: "Security and data — How we protect your systems | Nodex",
  description:
    "What your security, legal and procurement teams usually ask before we start.",
});

export default function Page() {
  return <SecurityTemplate locale="en" />;
}
