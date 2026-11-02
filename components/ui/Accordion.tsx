import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  question: ReactNode;
  answer: ReactNode;
};

// FAQ list (spec §4.6): native <details>/<summary> without the marker and a
// +/- drawn with two bars that rotate in 0.25s. Questions in Geist 20px
// (17px at <= 1024px). Server-rendered; no JavaScript needed.
export default function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => (
        <details key={i} className="group/faq border-b border-line">
          <summary className="t-faq-q flex items-center justify-between gap-6 py-5 text-ink transition-colors hover:text-brand focus-visible:outline-2">
            <span className="min-w-0">{item.question}</span>
            <span aria-hidden="true" className="relative size-3.5 shrink-0">
              <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current transition-transform duration-250 group-open/faq:rotate-90" />
            </span>
          </summary>
          <div className="max-w-[640px] pr-10 pb-6 text-[17px] leading-[1.55] text-body max-[1025px]:text-[16px]">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
