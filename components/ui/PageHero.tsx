import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Media, { type MediaVariant } from "@/components/ui/Media";
import { type } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

// Hero of the inner pages (.phero): two-tone H1, lead and CTA on the left, a
// strip of three images on the right (3 columns 1.3fr/1fr/1fr; 2 columns at
// <= 520px; drops below the text at <= 860px).
export default function PageHero({
  eyebrow,
  lead,
  tail,
  intro,
  cta,
  media,
  className,
}: {
  eyebrow?: ReactNode;
  lead: ReactNode;
  tail?: ReactNode;
  intro?: ReactNode;
  cta?: { href: string; label: string; variant?: "primary" | "outline" };
  media?: readonly [MediaVariant, MediaVariant, MediaVariant];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "pt-[clamp(32px,calc(var(--cqi)*5),72px)] pb-[clamp(32px,calc(var(--cqi)*4),56px)] max-[701px]:pt-10 max-[701px]:pb-12",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-x-[clamp(28px,calc(var(--cqi)*5),80px)] gap-y-10",
            media && "min-[861px]:grid-cols-[1.15fr_0.85fr]",
          )}
        >
          <div>
            {eyebrow ? (
              <Eyebrow tone="brand" className="mb-4">
                {eyebrow}
              </Eyebrow>
            ) : null}
            <Heading as="h1" size="h1" lead={lead} tail={tail} />
            {intro ? (
              <p className={cn(type.lead, "mt-6 max-w-[560px]")}>{intro}</p>
            ) : null}
            {cta ? (
              <div className="mt-8">
                <ButtonLink href={cta.href} variant={cta.variant}>
                  {cta.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
          {media ? (
            <div className="grid h-[clamp(220px,calc(var(--cqi)*24),340px)] grid-cols-[1.3fr_1fr_1fr] gap-2 max-[861px]:h-[180px] max-[521px]:h-[150px] max-[521px]:grid-cols-2">
              {media.map((variant, i) => (
                <Media
                  key={i}
                  variant={variant}
                  className={cn("h-full", i === 2 && "max-[521px]:hidden")}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
