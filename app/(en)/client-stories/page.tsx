import type { Metadata } from "next";

import ClientStoriesTemplate from "@/components/templates/ClientStoriesTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "clientStories",
  title: "Client stories — Work in production | Nodex",
  description:
    "Systems we've built inside our clients' teams, from AI agents to data platforms.",
});

export default function Page() {
  return <ClientStoriesTemplate locale="en" />;
}
