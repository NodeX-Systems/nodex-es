import type { Metadata } from "next";
import JobApplicationTemplate from "@/components/templates/JobApplicationTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const routes = ROUTES.es;
const path = routes.jobs;
const canonical = `${SITE_URL}${path}`;
const title = "NodeX || Únete al Equipo";
const description =
  "Envía tu candidatura a NodeX y súmate a nuestro equipo de talento técnico senior en Valencia.";

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
    locale: "es_ES",
    type: "website",
  },
};

export default function JobApplicationPage() {
  return <JobApplicationTemplate locale="es" />;
}
