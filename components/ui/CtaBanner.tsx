import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Media, { type MediaVariant } from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

// Closing card (.closing): dark rounded panel with an image behind the H2
// and a light CTA. 380px tall at 1440, 300 at 1024-768, 230 on mobile.
export default function CtaBanner({
  title,
  label,
  href,
  variant = "beams",
  position,
}: {
  title: string;
  label: string;
  href: string;
  variant?: MediaVariant;
  position?: string;
}) {
  return (
    <Reveal
      as="section"
      className="border-t border-line pt-[clamp(40px,calc(var(--cqi)*5),72px)] pb-[clamp(40px,calc(var(--cqi)*5),64px)] max-[700px]:pt-10 max-[700px]:pb-12"
    >
      <Container>
        <div className="relative isolate flex min-h-[clamp(300px,calc(var(--cqi)*26.4),380px)] flex-col justify-end overflow-hidden rounded-3xl bg-panel p-[clamp(24px,calc(var(--cqi)*4),64px)] text-paper-dark max-[700px]:min-h-[230px] max-[700px]:rounded-[18px]">
          <Media
            variant={variant}
            position={position}
            sizes="100vw"
            className="absolute inset-0 -z-10 rounded-none"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-panel/85 via-panel/35 to-transparent" />
          <Heading
            size="close"
            tone="light"
            lead={title}
            className="max-w-[640px]"
          />
          <div className="mt-6">
            <ButtonLink href={href} variant="light">
              {label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
