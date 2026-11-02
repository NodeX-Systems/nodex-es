import type { Metadata } from "next";

import AboutTemplate from "@/components/templates/AboutTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "about",
  title: "About — The team behind the work | Nodex",
  description:
    "Nodex is a team of Forward Deployed Engineers based in Valencia, Spain. We build software and AI that runs in production, inside our clients' teams.",
});

export default function Page() {
  return <AboutTemplate locale="en" />;
}
