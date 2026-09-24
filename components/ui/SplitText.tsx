import { isValidElement, type ElementType, type ReactNode } from "react";
import InView from "@/components/ui/InView";
import SplitChars from "@/components/ui/SplitChars";
import { cn } from "@/lib/cn";

function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return toText(node.props.children);
  }
  return "";
}

// Per-character heading entrance, replacing the GSAP SplitText
// `.text-anime-style-3` effect: each char slides in from x=50px while
// fading in, 1s back-out easing, 20ms stagger, once the heading's top
// enters the bottom 95% of the viewport. The chars are rendered by the tiny
// SplitChars client component, so the RSC payload carries just the string
// instead of hundreds of serialized spans (the HTML still has them all).
//
// Children must be plain text (strings / fragments of strings) -- any
// markup inside is flattened to its text.

// Char styles live on the wrapper (a descendant selector) rather than on
// each of the hundreds of char spans, to keep the HTML small. (Written out
// literally: Tailwind only generates classes it finds in source.)
const CHARS =
  "[&_[data-reveal-item]]:inline-block [&_[data-reveal-item]]:translate-x-[50px] [&_[data-reveal-item]]:opacity-0 " +
  "[&_[data-reveal-item]]:transition-[opacity,translate] [&_[data-reveal-item]]:duration-1000 [&_[data-reveal-item]]:ease-back-out " +
  "group-data-inview/split:[&_[data-reveal-item]]:translate-none group-data-inview/split:[&_[data-reveal-item]]:opacity-100 " +
  "motion-reduce:[&_[data-reveal-item]]:translate-none motion-reduce:[&_[data-reveal-item]]:opacity-100 motion-reduce:[&_[data-reveal-item]]:transition-none";

export default function SplitText({
  as = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const text = toText(children).replace(/\s+/g, " ").trim();

  return (
    <InView
      as={as}
      once
      rootMargin="0px 0px -5% 0px"
      className={cn("group/split perspective-[400px]", className)}
    >
      <span className="sr-only">{text}</span>
      <SplitChars text={text} className={CHARS} />
    </InView>
  );
}
