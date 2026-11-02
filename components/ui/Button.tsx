import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/icons";

// Pill buttons (spec §1.5 / §4.1).
//   primary: solid near-black; lifts 2px on hover with a soft mint halo
//   outline: hairline; fills with ink from left to right on hover
//   light:   solid white-ish, for dark panels
// Sizes: md 48px, cta 44px (header; 42px from 961px up with a mouse), mini
// 36px (44px on touch screens). Heights are minimums and the label wraps
// instead of overflowing, so a long label in a narrow column grows the pill
// rather than cutting it off.

type Variant = "primary" | "outline" | "light";
type Size = "md" | "cta" | "mini";

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(
    "group/btn relative isolate inline-flex max-w-full shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full text-center font-sans font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-250 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
    size === "md" && "min-h-12 px-6 py-2.5 text-[15px]",
    size === "cta" &&
      "min-h-11 px-4 py-2 text-[13.5px] min-[961px]:min-h-[42px] min-[961px]:px-[18px] min-[961px]:text-[14px] min-[961px]:pointer-coarse:min-h-11",
    size === "mini" &&
      "min-h-9 px-3.5 py-1.5 text-[13px] font-medium pointer-coarse:min-h-11",
    variant === "primary" &&
      "bg-ink text-canvas hover:bg-black hover:shadow-[0_10px_30px_-10px_rgba(202,237,231,0.45)]",
    variant === "outline" &&
      "border border-line-strong text-ink before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-ink before:transition-transform before:duration-350 before:ease-brand hover:border-ink hover:text-canvas hover:before:scale-x-100",
    variant === "light" &&
      "bg-paper-dark text-void-dark hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(202,237,231,0.45)]",
    className,
  );
}

function Arrow({ icon }: { icon: ReactNode | null | undefined }) {
  if (icon === null) return null;
  return (
    <span className="inline-flex text-[10px] transition-transform duration-250 ease-brand group-hover/btn:translate-x-1">
      {icon ?? <ArrowIcon />}
    </span>
  );
}

type Shared = {
  variant?: Variant;
  size?: Size;
  /** Trailing icon; defaults to an arrow, `null` removes it. */
  icon?: ReactNode | null;
};

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: Shared & ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={buttonClass(variant, size, className)}
      {...props}
    >
      {children}
      <Arrow icon={icon} />
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: Shared & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      <Arrow icon={icon} />
    </Link>
  );
}
