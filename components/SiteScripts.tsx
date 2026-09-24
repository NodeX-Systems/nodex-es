"use client";

import Script from "next/script";

// Bottom-of-body scripts, in the exact original order. jquery itself is
// loaded separately in the root layout with strategy="beforeInteractive"
// since every one of these depends on the global $ / jQuery already
// existing -- do not load it again here.
//
// next/script's afterInteractive strategy inserts each <Script> as an
// async-by-default <script> element with no execution-order guarantee
// across siblings (confirmed against the Next.js 16.3.6 source: only
// beforeInteractive scripts are chained/awaited in order; afterInteractive
// scripts race each other exactly like <script async>). Several of these
// files have hard top-level runtime dependencies on the ones before them
// -- e.g. text-animation.js's first line is
// `gsap.registerPlugin(ScrollTrigger, SplitText)`, and main.js calls
// `.slick(...)` inside its jQuery-ready handler -- so out-of-order
// execution throws a ReferenceError / "not a function" and silently
// aborts the rest of that script. Passing `async={false}` on every Script
// here makes the browser execute them in DOM insertion order (the
// documented browser behavior for non-async, dynamically inserted
// scripts), matching the original site's sequential <script> tags.
export default function SiteScripts({
  hasContactForm,
}: {
  hasContactForm: boolean;
}) {
  return (
    <>
      <Script
        src="/assets/js/bootstrap.min.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script src="/assets/js/aos.js" strategy="afterInteractive" async={false} />
      <Script
        src="/assets/js/fontawesome.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/mobile-menu.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/slick-slider.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/gsap.min.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/ScrollTrigger.min.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/Splitetext.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/SmoothScroll.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/text-animation.js"
        strategy="afterInteractive"
        async={false}
      />
      <Script
        src="/assets/js/main.js?v=1"
        strategy="afterInteractive"
        async={false}
        onLoad={() => {
          // main.js hides the preloader via $(window).on("load", ...), which
          // only fires for a "load" event that happens AFTER this listener
          // is attached. With next/script's afterInteractive strategy,
          // main.js can finish loading after the browser's window "load"
          // event has already fired (unlike the original site, where it was
          // a synchronous <script> tag parsed before "load" could fire), so
          // that handler is silently missed and the preloader never hides.
          // Fall back to the same jQuery call main.js would have made.
          if (document.readyState === "complete") {
            const jq = (window as unknown as { jQuery?: (s: string) => { fadeToggle: () => void } }).jQuery;
            jq?.(".preloader").fadeToggle();
          }
        }}
      />
      {hasContactForm && (
        <Script
          src="/assets/js/contact-form.js?v=1"
          strategy="afterInteractive"
          async={false}
        />
      )}
    </>
  );
}
