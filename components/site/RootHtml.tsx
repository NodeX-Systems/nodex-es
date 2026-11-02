import { IBM_Plex_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import AnalyticsEvents from "@/components/site/AnalyticsEvents";
import CookieConsent from "@/components/site/CookieConsent";
import ViewportUnits from "@/components/site/ViewportUnits";
import type { Locale } from "@/lib/routes";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Geist variable (SIL OFL), self-hosted from the supplied file. The prototype
// renders it with size-adjust 97%.
const geist = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "97%" }],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// <html> shared by every locale's root layout, so `lang` is correct in the
// static HTML of each page (not patched in by the client afterwards).
export default function RootHtml({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${geist.variable} ${plexMono.variable}`}
    >
      <body>
        <ViewportUnits />
        <AnalyticsEvents />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
