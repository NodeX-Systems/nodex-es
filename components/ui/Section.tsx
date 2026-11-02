import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

// Section separated from the previous one by a 1px hairline. Pass the
// vertical padding from the spec's table (§1.3) via `className`; without it
// the common `clamp(48px, 6cqi, 96px)` rhythm is used. Sections below the
// first screen fade in as they enter (A1).
export default function Section({
  id,
  divider = true,
  reveal = true,
  className,
  children,
}: {
  id?: string;
  divider?: boolean;
  reveal?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    divider && "border-t border-line",
    className ??
      "py-[clamp(48px,calc(var(--cqi)*6),96px)] max-[701px]:py-16",
  );
  const inner = <Container>{children}</Container>;
  if (!reveal) {
    return (
      <section id={id} className={classes}>
        {inner}
      </section>
    );
  }
  return (
    <Reveal as="section" id={id} className={classes}>
      {inner}
    </Reveal>
  );
}
