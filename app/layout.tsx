import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

// Figtree (OFL), self-hosted: this is the exact variable latin file Google
// Fonts served the original site. next/font/google fetches an unhinted
// build of the same version that renders ~1% wider on Linux/Windows, which
// changed line wrapping.
const figtree = localFont({
  src: "./fonts/Figtree-latin.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NodeX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={figtree.variable}>
      <body>
        {/* Rendered once in the root layout (not per-page) so it survives
            client-side <Link> navigations instead of being unmounted and
            remounted on every route change. */}
        <SiteChrome />
        {children}
        {/* Without JS, show everything the scroll animations would reveal. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-item]{opacity:1!important;translate:none!important;scale:none!important;visibility:visible!important}`}</style>
        </noscript>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
