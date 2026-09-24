// The template's .overlay-anim hover flash: from md up, a 30% white layer
// sits collapsed at the top of the element and, on hover, grows to full
// height while fading out (400ms linear). Leaving snaps it back instantly,
// like the original (the transition was only declared on :hover).
export const overlayAnim =
  "md:relative md:after:pointer-events-none md:after:absolute md:after:top-0 md:after:left-0 md:after:z-9 md:after:h-0 md:after:w-full md:after:bg-white/30 md:after:opacity-100 " +
  "md:hover:after:h-full md:hover:after:opacity-0 md:hover:after:transition-all md:hover:after:duration-400 md:hover:after:ease-linear";
