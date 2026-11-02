import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type, type TypeKey } from "@/components/ui/typography";

// Two-tone headline: the lead in ink, the tail in the muted grey (#7D8D90)
// the design uses for the second half of page titles ("One way of working.
// Four ways to start."). `tone="light"` is for the dark closing card.
export default function Heading({
  as: Tag = "h2",
  size = "h2",
  tone = "dark",
  lead,
  tail,
  className,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: TypeKey;
  tone?: "dark" | "light";
  lead: ReactNode;
  tail?: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        type[size],
        tone === "light" ? "text-paper-dark" : "text-ink",
        className,
      )}
    >
      {lead}
      {tail ? (
        <>
          {" "}
          <span className={tone === "light" ? "text-paper-dark/55" : "text-faint"}>
            {tail}
          </span>
        </>
      ) : null}
    </Tag>
  );
}
