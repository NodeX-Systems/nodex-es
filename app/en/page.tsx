import type { Metadata } from "next";
import HomeTemplate from "@/components/templates/HomeTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const title = "NodeX - Technical Staffing";
const description =
  "NodeX embeds senior IT teams into your business immediately to accelerate development, products, and strategic platforms.";
const canonical = `${SITE_URL}${ROUTES.en.home}`;

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

export default function HomePage() {
  return <HomeTemplate locale="en" />;
}
