import type { Metadata } from "next";

import ContactTemplate from "@/components/templates/ContactTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "contact",
  title: "Request a scoping call — 30 minutes with a senior engineer | Nodex",
  description:
    "Tell us the problem. In 30 minutes we tell you honestly whether we're the right team, and how we would start.",
});

export default function Page() {
  return <ContactTemplate locale="en" />;
}
