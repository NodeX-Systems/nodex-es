import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { headingOnDark } from "@/components/ui/typography";

// Dark band under the hero: service image on the left, title + intro text +
// "Let's talk" button on the right (stacked below 992px).
export default function ServiceIntroBand({
  image,
  title,
  text,
  ctaLabel,
  ctaHref,
}: {
  image: StaticImageData;
  title: ReactNode;
  text: ReactNode;
  ctaLabel: ReactNode;
  ctaHref: string;
}) {
  return (
    <div className="bg-ink pt-[50px] pb-20 lg:pt-20">
      <Container>
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 px-3 lg:w-1/2">
            {/* Hover: a translucent white sheet drops over the image and
                fades out (the template's .overlay-anim, 768px and up). */}
            <div className="md:relative md:after:pointer-events-none md:after:absolute md:after:top-0 md:after:left-0 md:after:z-9 md:after:h-0 md:after:w-full md:after:bg-white/30 md:after:opacity-100 md:hover:after:h-full md:hover:after:opacity-0 md:hover:after:transition-all md:hover:after:duration-400 md:hover:after:ease-linear">
              <Image src={image} alt="" loading="eager" className="block w-full" />
            </div>
          </div>
          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <div className="max-lg:mt-[30px] lg:pl-10">
              <h2 className={headingOnDark.h2}>{title}</h2>
              <p className={`mt-4 ${headingOnDark.p}`}>{text}</p>
              <div className="h-[15px] md:h-[30px]" />
              <ButtonLink href={ctaHref}>
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
