import type { Metadata } from "next";

import CaseStoryTemplate from "@/components/templates/CaseStoryTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "caseSaas",
  title: "SaaS platform — Faster to load, cheaper to run | Nodex",
  description:
    "A SaaS platform whose performance and cloud bill were holding the product back. We optimised the platform and its matching algorithms.",
});

export default function Page() {
  return <CaseStoryTemplate locale="en" caseId="saas" />;
}
