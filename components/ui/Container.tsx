import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Same widths as the Bootstrap .container the layout was designed on
// (540 / 720 / 960 / 1140 / 1320 px, 12px side padding). Tailwind's own
// `container` utility uses different max-widths, so don't use it.
export default function Container({
  fluid = false,
  className,
  children,
}: {
  fluid?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-3",
        !fluid &&
          "sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
