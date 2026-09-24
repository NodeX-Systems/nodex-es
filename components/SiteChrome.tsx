import Preloader from "@/components/chrome/Preloader";
import ScrollProgress from "@/components/chrome/ScrollProgress";

// Page-independent chrome: the preloader overlay (first load + slow
// client-side navigations) and the back-to-top / scroll-progress button.
// Rendered once in the root layout so it survives client-side navigations.
export default function SiteChrome() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      {/* The preloader is hidden by JS; without JS, never show it. */}
      <noscript>
        <style>{`[data-preloader]{display:none!important}`}</style>
      </noscript>
    </>
  );
}
