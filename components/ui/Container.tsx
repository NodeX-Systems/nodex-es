import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Content wrapper (.wrap): 1360px max including 40px side padding (18px at
// <= 700px), so the usable content is 1280px wide. Tailwind's max-[N] is
// exclusive (< N): "up to 700px" is max-[701px], here and in the other ui
// components, to match the inclusive max-width queries in globals.css.
export default function Container({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1360px] px-10 max-[701px]:px-[18px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
