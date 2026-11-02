import type { Metadata } from "next";

import HowWeWorkTemplate from "@/components/templates/HowWeWorkTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "howWeWork",
  title: "How we work — Inside your team in one week | Nodex",
  description:
    "A simple process, run with judgment: understand, define, onboard, ship and scale.",
});

export default function Page() {
  return <HowWeWorkTemplate locale="en" />;
}
