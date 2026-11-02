"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import Media, { type MediaName } from "@/components/ui/Media";
import { ArrowIcon, ArrowLeftIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type ClientPanel = {
  id: string;
  image: MediaName;
  client: string;
  headline: string;
  /** Present only once the client has approved a quote. */
  quote?: string;
  person?: string;
  role?: string;
};

// "Our clients speak for us" stage (spec §4.5). Four panels, two visible: the
// main one (2/3 of the width, 80% on mobile) and the next (1/3, 20%). Hovering
// the side panel previews it as the main one, clicking it or using the arrows
// moves on (looping). The track slides 0.9s; the side panel is dimmed and the
// main image drifts slowly (Ken Burns). Hidden panels are inert.
export default function ClientVideos({
  panels,
  labels,
}: {
  panels: readonly ClientPanel[];
  labels: { prev: string; next: string; read: string; href: string; counter: string };
}) {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const n = panels.length;
  const shown = hover ?? current;
  const go = (delta: number) => {
    setHover(null);
    setCurrent((c) => (c + delta + n) % n);
  };

  return (
    <div>
      <div
        onPointerLeave={() => setHover(null)}
        className="relative h-[clamp(460px,calc(var(--cqi)*50),720px)] overflow-hidden bg-void-dark text-paper-dark max-[700px]:h-[540px]"
        style={
          {
            "--main": "66.667",
            "--side": "33.333",
          } as CSSProperties
        }
      >
        <ul
          className="flex h-full transition-transform duration-[900ms] ease-stage"
          style={{
            transform: `translateX(calc(var(--cqi) * ${-33.333 * shown}))`,
          }}
        >
          {panels.map((p, i) => {
            const isMain = i === shown;
            const visible = i === shown || i === (shown + 1) % n;
            return (
              <li
                key={p.id}
                inert={!visible}
                aria-hidden={!visible}
                onPointerEnter={(e) => {
                  if (!isMain && visible && e.pointerType === "mouse") setHover(i);
                }}
                onClick={() => {
                  if (!isMain && visible) {
                    setHover(null);
                    setCurrent(i);
                  }
                }}
                className={cn(
                  "relative h-full shrink-0 overflow-hidden border-l border-paper-dark/60 transition-[width] duration-[900ms] ease-stage first:border-l-0",
                  isMain
                    ? "w-[calc(var(--cqi)*66.667)] max-[700px]:w-[calc(var(--cqi)*80)]"
                    : "w-[calc(var(--cqi)*33.333)] cursor-pointer max-[700px]:w-[calc(var(--cqi)*20)]",
                )}
              >
                <Media
                  variant={p.image}
                  sizes="70vw"
                  className="absolute inset-0 rounded-none"
                  imgClassName={cn(
                    "transition-[filter] duration-[900ms]",
                    isMain
                      ? "animate-[ken-burns_16s_ease-in-out_infinite_alternate]"
                      : "brightness-[0.62] saturate-[0.8]",
                  )}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,5,.45)_0%,rgba(2,4,5,0)_26%,rgba(2,4,5,.1)_48%,rgba(2,4,5,.88)_100%)]" />
                {isMain ? (
                  <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,calc(var(--cqi)*3),48px)] max-[700px]:p-5">
                    <p className="t-tag mb-3 text-mist-dark">{p.client}</p>
                    {p.quote ? (
                      <blockquote className="max-w-[640px] font-display text-[clamp(20px,calc(var(--cqi)*2),30px)] leading-[1.15] font-semibold tracking-[-0.03em]">
                        “{p.quote}”
                      </blockquote>
                    ) : null}
                    {p.person ? (
                      <p className="mt-3 text-[15px] text-mist-dark">
                        {p.person}
                        {p.role ? `, ${p.role}` : ""}
                      </p>
                    ) : null}
                    <h3 className="t-h3-case mt-5 max-w-[560px]">{p.headline}</h3>
                    <Link
                      href={labels.href}
                      className="mt-4 inline-flex min-h-10 items-center gap-2 text-[15px] font-medium text-paper-dark hover:text-mint"
                    >
                      {labels.read}
                      <ArrowIcon className="text-[12px]" />
                    </Link>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mx-auto flex max-w-[1360px] justify-end gap-2 px-10 pt-4 max-[700px]:px-[18px]">
        <p className="sr-only" aria-live="polite">
          {labels.counter
            .replace("{i}", String(current + 1))
            .replace("{n}", String(n))}
        </p>
        <button
          type="button"
          aria-label={labels.prev}
          onClick={() => go(-1)}
          className="flex size-12 items-center justify-center rounded-full border border-line-strong text-[18px] text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-canvas active:scale-[0.92]"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => go(1)}
          className="flex size-12 items-center justify-center rounded-full border border-line-strong text-[18px] text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-canvas active:scale-[0.92]"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
