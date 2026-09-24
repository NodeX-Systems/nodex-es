import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { heading } from "@/components/ui/typography";
import { overlayAnim } from "@/components/home/overlay";
import workImg from "@/public/assets/img/work/work-image.png";

export type WorkStep = {
  icon: StaticImageData;
  href: string;
  title: ReactNode;
  text: ReactNode;
};

// Bootstrap's reboot h4 metrics (the h4 itself is unstyled by the
// template; only its link is).
const H4 = "text-[calc(1.275rem+.3vw)] leading-[1.2] font-medium xl:text-2xl";

// "How we work" (.work1): revealed photo on the left, heading + three
// step cards on the right.
export default function HowWeWork({
  eyebrow,
  title,
  text,
  steps,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  steps: WorkStep[];
}) {
  const durations = [900, 700, 1100];
  return (
    <div className="overflow-x-clip bg-surface py-[50px] md:py-25">
      <Container>
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <ImageReveal
              src={workImg}
              alt=""
              className={overlayAnim}
              imgClassName="w-full"
            />
          </div>

          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <div className="mt-10 lg:mt-0 lg:pl-[30px]">
              <Reveal
                as="span"
                effect="zoom-in-left"
                duration={700}
                className={heading.eyebrow}
              >
                {eyebrow}
              </Reveal>
              <SplitText as="h2" className={heading.h2}>
                {title}
              </SplitText>
              <div className="h-4" />
              <Reveal
                as="p"
                effect="fade-left"
                duration={900}
                className="text-lg leading-7 font-medium text-body"
              >
                {text}
              </Reveal>

              <div className="h-[5px] md:h-2.5" />
              {steps.map((step, i) => (
                <Reveal key={i} effect="fade-left" duration={durations[i] ?? 900}>
                  <div className="group mt-5 flex rounded-[4px] bg-white p-6 transition-all duration-400 ease-[ease] hover:-translate-y-2.5 hover:bg-mint">
                    <div>
                      <div className="mr-4 size-[60px] rounded-full bg-mint text-center leading-[60px] transition-all duration-400 ease-[ease] group-hover:bg-white">
                        <Image
                          src={step.icon}
                          alt=""
                          className="transition-all duration-400 ease-[ease] group-hover:brightness-0"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className={H4}>
                        <Link
                          href={step.href}
                          className={`${heading.h4Link} pb-2.5`}
                        >
                          {step.title}
                        </Link>
                      </h4>
                      <p className={`${heading.p} ease-[ease] group-hover:text-ink`}>
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
