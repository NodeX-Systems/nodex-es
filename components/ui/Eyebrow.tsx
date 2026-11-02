import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Small uppercase Plex Mono label (.tag).
export default function Eyebrow({
  tone = "muted",
  className,
  children,
}: {
  tone?: "muted" | "brand" | "light";
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "t-tag",
        tone === "brand" && "text-brand",
        tone === "muted" && "text-body",
        tone === "light" && "text-mist-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}
