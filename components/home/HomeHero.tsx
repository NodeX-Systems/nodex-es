import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import logoNodex from "@/public/assets/img/logo/logo_nodex.png";

export default function HomeHero({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  primary: { href: string; label: ReactNode };
  secondary: { href: string; label: ReactNode };
}) {
  return (
    <div className="flex min-h-[750px] items-center overflow-hidden bg-surface">
      <Container className="relative">
        <div className="pt-[140px] lg:pt-[60px]">
          <Reveal
            as="span"
            effect="fade-right"
            duration={800}
            className="mb-4 inline-block rounded-[4px] bg-mint/25 px-3 py-2 text-base leading-4 font-medium text-brand"
          >
            {eyebrow}
          </Reveal>
          <SplitText
            as="h1"
            className="text-[40px] leading-12 font-bold text-ink lg:text-[64px] lg:leading-[70px]"
          >
            {title}
          </SplitText>
          <div className="h-4" />
          <Reveal
            as="p"
            effect="fade-right"
            duration={1000}
            className="text-lg leading-7 font-medium text-body"
          >
            {text}
          </Reveal>

          <div className="h-[15px] md:h-[30px]" />
          <Reveal
            effect="fade-right"
            duration={1200}
            className="flex flex-wrap items-center gap-4"
          >
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink href={secondary.href} variant="outline" className="md:ml-5">
              {secondary.label}
            </ButtonLink>
          </Reveal>
        </div>

        {/* Decorative faded NodeX mark on the right (was .hero-container::after:
            400px wide, right center, 8% opacity, grayscale, hidden below lg).
            A CSS background like the original, so it is clipped to the
            container and never downloaded on small screens. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-size-[400px_auto] bg-right bg-no-repeat opacity-8 grayscale lg:block"
          style={{ backgroundImage: `url(${logoNodex.src})` }}
        />
      </Container>
    </div>
  );
}
