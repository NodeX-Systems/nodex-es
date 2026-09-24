import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import percentIcon from "@/public/assets/img/icons/choose1-icon2.png";
import clockIcon from "@/public/assets/img/icons/choose1-icon3.png";

// "Why NodeX" (.chosse1): two stat cards on the left, heading + checklist
// on the right.

function StatCard({
  icon,
  value,
  label,
  className,
}: {
  icon: StaticImageData;
  value: ReactNode;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-[4px] bg-surface p-6 text-center transition-all duration-400 ease-[ease] hover:-translate-y-2.5 hover:bg-brand",
        className,
      )}
    >
      <div className="mb-5 transition-all duration-400 ease-[ease]">
        <Image
          src={icon}
          alt=""
          className="transition-all duration-400 ease-[ease] group-hover:rotate-y-180 group-hover:brightness-[40]"
        />
      </div>
      <div>
        <h3 className="text-[32px] leading-8 font-bold text-ink transition-all duration-400 ease-[ease] group-hover:text-white">
          {value}
        </h3>
        <div className="h-[5px] md:h-2.5" />
        <p className="text-lg leading-7 font-medium text-body transition-all duration-400 ease-[ease] group-hover:text-white">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function WhyNodex({
  stat1,
  stat2,
  eyebrow,
  title,
  text,
  items,
  button,
}: {
  stat1: ReactNode;
  stat2: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  items: ReactNode[];
  button: { href: string; label: ReactNode };
}) {
  return (
    <div className="overflow-x-clip py-[50px] md:py-25">
      <Container>
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 px-3 lg:w-1/6">
            <Reveal effect="zoom-in-up" duration={900}>
              <StatCard
                icon={percentIcon}
                value={
                  <>
                    <span>100</span>%
                  </>
                }
                label={stat1}
                className="mb-[30px]"
              />
            </Reveal>
            <Reveal effect="zoom-in-up" duration={1200}>
              <StatCard icon={clockIcon} value="<1 week" label={stat2} />
            </Reveal>
          </div>

          <div className="w-full shrink-0 px-3 lg:w-5/6">
            <div className="pt-[30px] lg:pt-0 lg:pl-[30px]">
              <Reveal
                as="span"
                effect="fade-left"
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
              <Reveal
                effect="fade-left"
                duration={800}
                className="-mx-3 flex flex-wrap"
              >
                {items.map((item, i) => (
                  <div key={i} className="w-full shrink-0 px-3 lg:w-1/2">
                    <ul className="mt-5">
                      <li className="text-lg leading-[18px] font-medium text-ink">
                        <span className="mr-[5px] inline-block size-5 rounded-full bg-ink text-center text-xs leading-5 text-white">
                          <CheckIcon />
                        </span>{" "}
                        {item}
                      </li>
                    </ul>
                  </div>
                ))}
              </Reveal>
              <div className="h-[15px] md:h-[30px]" />
              <Reveal effect="fade-left" duration={1100}>
                <ButtonLink href={button.href}>{button.label}</ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
