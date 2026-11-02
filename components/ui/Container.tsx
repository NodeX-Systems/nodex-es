import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Content wrapper (.wrap): 1360px max including 40px side padding (18px at
// <= 700px), so the usable content is 1280px wide.
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
        "mx-auto w-full max-w-[1360px] px-10 max-[700px]:px-[18px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
