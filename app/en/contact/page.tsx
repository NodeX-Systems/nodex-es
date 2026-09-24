import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const path = ROUTES.en.contact;
const canonical = `${SITE_URL}${path}`;
const title = "NodeX || Contact";
const description =
  "Get in touch with NodeX to accelerate your project's development or reinforce your team with senior technical talent.";

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

export default function ContactPageEn() {
  return <ContactTemplate locale="en" />;
}
