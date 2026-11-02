import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Hairline rows of "label | value" (.integr, process facts, media kit).
export default function KeyValueList({
  rows,
  labelStyle = "bold",
  className,
}: {
  rows: readonly { label: ReactNode; value: ReactNode }[];
  labelStyle?: "bold" | "mono";
  className?: string;
}) {
  return (
    <dl className={cn("border-t border-line", className)}>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(120px,200px)_1fr] sm:gap-8"
        >
          <dt
            className={
              labelStyle === "mono"
                ? "t-tag pt-1 text-body"
                : "font-display text-[19px] font-semibold tracking-[-0.02em] text-ink"
            }
          >
            {row.label}
          </dt>
          <dd className="text-[17px] leading-[1.55] text-body max-[1024px]:text-[16px]">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
