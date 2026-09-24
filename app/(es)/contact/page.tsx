import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const path = ROUTES.es.contact;
const canonical = `${SITE_URL}${path}`;
const title = "NodeX || Contacto";
const description =
  "Contacta con NodeX para acelerar el desarrollo de tu proyecto o reforzar tu equipo con perfiles técnicos senior.";

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

export default function ContactPageEs() {
  return <ContactTemplate locale="es" />;
}
