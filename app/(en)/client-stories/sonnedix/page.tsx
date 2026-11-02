import type { Metadata } from "next";

import CaseStoryTemplate from "@/components/templates/CaseStoryTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "caseSonnedix",
  title: "Sonnedix — One data layer, AI on top, with guardrails | Nodex",
  description:
    "A single source of truth for every department, with RAG pipelines and agents that go from risk assessment to draft notifications, under human review.",
});

export default function Page() {
  return <CaseStoryTemplate locale="en" caseId="sonnedix" />;
}
