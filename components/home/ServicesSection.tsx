import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { headingOnDark } from "@/components/ui/typography";
import { overlayAnim } from "@/components/home/overlay";

export type ServiceCardData = {
  image: StaticImageData;
  icon: StaticImageData;
  href: string;
  title: ReactNode;
  text: ReactNode;
};

// Bootstrap's reboot h4 metrics (the h4 itself is unstyled by the
// template; only its link is).
const H4 = "text-[calc(1.275rem+.3vw)] leading-[1.2] font-medium xl:text-2xl";

// .service1-box: photo card. From lg up the text panel is hidden and slides
// up on hover while a mint circle rises from the bottom and the photo
// zooms/tilts; below lg the panel and circle are always shown.
function ServiceCard({
  card,
  duration,
}: {
  card: ServiceCardData;
  duration: number;
}) {
  return (
    <Reveal
      effect="zoom-in-up"
      duration={duration}
      className={
        "group relative mt-[30px] overflow-hidden rounded-[4px] " +
        "after:absolute after:-right-[30px] after:-bottom-[300px] after:size-[600px] after:rounded-full after:bg-mint after:opacity-100 after:transition-all after:duration-400 after:ease-[ease] " +
        "lg:after:-bottom-[500px] lg:after:opacity-0 lg:hover:after:-bottom-[350px] lg:hover:after:opacity-100"
      }
    >
      <div className={overlayAnim}>
        <Image
          src={card.image}
          alt=""
          className="w-full transition-all duration-400 ease-[ease] group-hover:scale-110 group-hover:rotate-2"
        />
      </div>
      <div className="absolute bottom-0 z-2 m-6 transition-all duration-400 ease-[ease] lg:translate-y-[60px] lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
        <div>
          <Image
            src={card.icon}
            alt=""
            className="max-lg:brightness-0 lg:group-hover:brightness-0"
          />
        </div>
        <div className="h-4" />
        <div>
          <h4 className={H4}>
            <Link
              href={card.href}
              className="inline-block text-xl leading-5 font-bold text-ink lg:text-white lg:group-hover:text-ink"
            >
              {card.title}
            </Link>
          </h4>
          <div className="h-4" />
          <p className="text-lg leading-7 font-medium text-ink lg:text-[#ffffffc9] lg:group-hover:text-ink">
            {card.text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesSection({
  eyebrow,
  title,
  text,
  cards,
  button,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  cards: ServiceCardData[];
  button: { href: string; label: ReactNode };
}) {
  const durations = [700, 900, 1100];
  return (
    <div className="overflow-x-clip bg-ink py-[50px] md:py-25">
      <Container>
        <div className="-mx-3 flex flex-wrap">
          <div className="mx-auto w-full shrink-0 px-3 text-center lg:w-2/3">
            <div>
              <Reveal
                as="span"
                effect="zoom-in-left"
                duration={700}
                className={headingOnDark.eyebrow}
              >
                {eyebrow}
              </Reveal>
              <SplitText as="h2" className={headingOnDark.h2}>
                {title}
              </SplitText>
              <div className="h-4" />
              <Reveal as="p" effect="fade-left" duration={800} className={headingOnDark.p}>
                {text}
              </Reveal>
            </div>
          </div>
        </div>

        <div className="h-[15px] md:h-[30px]" />
        <div className="-mx-3 flex flex-wrap">
          {cards.map((card, i) => (
            <div key={i} className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3">
              <ServiceCard card={card} duration={durations[i] ?? 700} />
            </div>
          ))}

          <div className="h-[25px] w-full shrink-0 md:h-[50px]" />
          <div className="w-full shrink-0 px-3">
            <Reveal effect="zoom-in-up" duration={700} className="text-center">
              <ButtonLink href={button.href} variant="cta">
                {button.label}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
