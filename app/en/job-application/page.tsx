import type { Metadata } from "next";
import JobApplicationTemplate from "@/components/templates/JobApplicationTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.en;
const path = routes.jobs;
const canonical = `${SITE_URL}${path}`;
const title = "NodeX || Join Our Team";
const description =
  "Send your application to NodeX and join our senior technical talent team based in Valencia.";

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

export default function JobApplicationPage() {
  return <JobApplicationTemplate locale="en" />;
}
