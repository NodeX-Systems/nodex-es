import type { Metadata } from "next";

import LegalTemplate from "@/components/templates/LegalTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  route: "legal",
  title: "Legal — Legal notice, privacy, cookies and accessibility | Nodex",
  description:
    "Nodex legal notice, privacy policy, cookie policy and accessibility statement.",
});

export default function Page() {
  return <LegalTemplate locale="en" />;
}
