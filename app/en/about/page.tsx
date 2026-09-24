import type { Metadata } from "next";
import AboutTemplate from "@/components/templates/AboutTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const title = "NodeX || About";
const description =
  "Meet the NodeX team: senior technical talent that embeds in your organization to execute with judgement from day one.";
const canonical = `${SITE_URL}${ROUTES.en.about}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutTemplate locale="en" />;
}
