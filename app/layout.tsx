import type { Metadata } from "next";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "NodeX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/assets/img/logo/titel.png" type="image/x-icon" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/slick-slider.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />
        <link rel="stylesheet" href="/assets/css/mobile-menu.css" />
        <link rel="stylesheet" href="/assets/css/main.css?v=1" />
        <link rel="stylesheet" href="/assets/css/contact-form.css?v=1" />
        {/* jQuery must load synchronously before any other script that
            depends on the global $ / jQuery existing. */}
        <Script
          src="/assets/js/jquery-3-6-0.min.js"
          strategy="beforeInteractive"
        />
        {/* Google Analytics -- identical on every page/locale. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="body">{children}</body>
    </html>
  );
}
