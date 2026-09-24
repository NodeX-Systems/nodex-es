"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// FAQ accordion, replacing the Bootstrap collapse + main.js "active item"
// handler. Behaves like the original: one panel open at a time
// (data-bs-parent), the first one open on load, and the last-clicked item
// is highlighted in brand green whether it was opened or closed.
export type AccordionItem = { question: ReactNode; answer: ReactNode };

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={cn(
        "ml-auto size-5 shrink-0 transition-transform duration-200 ease-in-out",
        className,
      )}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);
  const [active, setActive] = useState(0);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const isActive = active === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div
            key={i}
            className={cn(
              "mt-5 rounded-[7px] p-0.5 text-black transition-all duration-400",
              isActive ? "bg-brand" : "bg-faq",
            )}
          >
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setActive(i);
                  setOpen(isOpen ? null : i);
                }}
                className={cn(
                  "relative flex w-full items-center p-5 text-left text-lg leading-[18px] font-semibold [overflow-anchor:none]",
                  isActive
                    ? "bg-brand text-[#f5f3f4] transition-all duration-400"
                    : "bg-faq text-black transition-[color,background-color,border-color,box-shadow,border-radius] duration-150 ease-in-out",
                )}
              >
                {item.question}
                <Chevron
                  className={cn(
                    isOpen && "-rotate-180",
                    isActive && isOpen ? "text-white" : "text-black",
                  )}
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-350 ease-[ease] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "px-4 pb-4 text-base leading-7 font-normal",
                    isActive ? "text-white/70" : "text-black",
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
