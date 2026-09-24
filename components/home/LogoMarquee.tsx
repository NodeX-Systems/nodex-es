import Image from "next/image";
import Container from "@/components/ui/Container";
import auren from "@/public/assets/img/logo/sliderlogo-auren.png";
import bbva from "@/public/assets/img/logo/sliderlogo-bbva.png";
import dailyPlaylists from "@/public/assets/img/logo/sliderlogo-dailyplaylists.png";
import econocom from "@/public/assets/img/logo/sliderlogo-econocom.png";
import igeneris from "@/public/assets/img/logo/sliderlogo-igeneris.png";
import impackta from "@/public/assets/img/logo/sliderlogo-impackta.png";
import incentro from "@/public/assets/img/logo/sliderlogo-incentro.png";
import ioforge from "@/public/assets/img/logo/sliderlogo-ioforge.png";
import mediapro from "@/public/assets/img/logo/sliderlogo-mediapro.png";
import shakers from "@/public/assets/img/logo/sliderlogo-shakers.png";

const LOGOS = [
  { src: auren, alt: "Logo Auren" },
  { src: bbva, alt: "Logo BBVA" },
  { src: dailyPlaylists, alt: "Logo Daily Playlists" },
  { src: econocom, alt: "Logo Econocom" },
  { src: igeneris, alt: "Logo iGeneris" },
  { src: impackta, alt: "Logo Impackta" },
  { src: incentro, alt: "Logo Incentro" },
  { src: ioforge, alt: "Logo ioforge" },
  { src: mediapro, alt: "Logo Mediapro" },
  { src: shakers, alt: "Logo Shakers" },
];

// The client-logo strip under the hero (was a slick carousel with
// autoplaySpeed 0 / speed 8000 / cssEase linear, i.e. a continuous
// marquee). Pure CSS: the list is rendered twice and the track slides
// -50% (one full list) per cycle, then loops seamlessly.
//
// Slick's responsive settings, reproduced per breakpoint:
//   >= 1024px: 7 visible, 1 slide per 8s  -> 10 slides = 80s cycle
//   600-1023:  3 visible, 3 slides per 8s -> 80s / 3
//   480-599:   2 visible, 2 slides per 8s -> 40s
//   < 480:     2 visible, 1 slide per 8s  -> 80s
// The track holds 20 slides of 5% each; its width is (20 / visible) x 100%
// of the clipping strip, so a slide is exactly 1/visible of the strip.
// At 7-up slick rounded the slide width up to a whole pixel
// (Math.ceil(listWidth / slidesToShow)); round(up, ...) reproduces that,
// so the strip keeps its exact original height.
// The per-breakpoint speed is set with animation-duration.
// Hovering the strip pauses it (slick pauseOnHover).
export default function LogoMarquee() {
  return (
    <div className="bg-ink py-[50px]">
      <Container>
        <div className="group overflow-hidden">
          <div className="flex w-[1000%] animate-marquee [animation-duration:80s] group-hover:[animation-play-state:paused] min-[480px]:[animation-duration:40s] min-[600px]:w-[calc(2000%/3)] min-[600px]:[animation-duration:calc(80s/3)] min-[1024px]:w-[calc(2000%/7)] min-[1024px]:[animation-duration:80s] min-[1024px]:supports-[width:round(1px,1px)]:w-[calc(20*round(up,100%/7,1px))]">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                aria-hidden={i >= LOGOS.length ? true : undefined}
                className="w-[5%] shrink-0 px-[30px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  loading="eager"
                  className="block"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
