// Preloader + scroll-progress markup, byte-identical on every page.
// main.js unconditionally calls
// document.querySelector(".progress-wrap path").getTotalLength() on ready,
// so this markup must be present on every single page or the ready handler
// throws and other init code (accordion, slick, sticky header) silently
// breaks.
export default function SiteChrome() {
  return (
    <>
      <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-icon">
            <img src="/assets/img/logo/titel.png" alt="" />
          </div>
        </div>
      </div>
      <div className="paginacontainer">
        <div className="progress-wrap">
          <svg
            className="progress-circle svg-content"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
      </div>
    </>
  );
}
