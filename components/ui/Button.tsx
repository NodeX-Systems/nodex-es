import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

// The template's .theme-btn1 / .theme-btn2 / .theme-btn3: two pseudo-element
// layers sweep in on hover (::before scales in from the left, ::after grows
// vertically on top of it) and the label turns white.
//
// NOTE: .theme-btn2 also had `margin-left: 20px` (0 below 768px); that is
// layout, not part of the button, so add `md:ml-5` at the call site.
export type ButtonVariant = "primary" | "outline" | "cta";

const BASE =
  "relative z-1 inline-block cursor-pointer appearance-none overflow-hidden rounded-[4px] align-middle text-base leading-4 font-bold capitalize text-ink outline-none! hover:text-white " +
  "before:absolute before:inset-0 before:-z-1 before:origin-left before:scale-x-0 before:transition-all before:delay-100 before:duration-500 before:ease-in-out hover:before:scale-x-100 " +
  "after:absolute after:inset-0 after:-z-1 after:origin-right after:scale-y-0 after:transition-all after:ease-linear hover:after:origin-bottom hover:after:scale-y-100 hover:after:duration-400";

const VARIANTS: Record<ButtonVariant, string> = {
  // .theme-btn1
  primary:
    "bg-mint px-[22px] py-[18px] before:bg-brand after:bg-forest after:duration-600",
  // .theme-btn2
  outline:
    "border-2 border-ink bg-transparent px-[22px] py-4 transition-all duration-400 before:bg-mint after:bg-forest after:duration-400",
  // .theme-btn3
  cta: "bg-mint px-[22px] py-[18px] before:bg-brand after:bg-mint after:duration-600",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(BASE, VARIANTS[variant], className);
}

function ButtonIcon({ icon }: { icon: ReactNode }) {
  return (
    <span className="relative ml-1 inline-block -rotate-45 text-[16px] transition-all duration-400 ease-linear">
      {icon}
    </span>
  );
}

type OwnProps = {
  variant?: ButtonVariant;
  /** Trailing icon, rotated -45deg like the original. Defaults to an arrow; pass null for none. */
  icon?: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  icon = <ArrowRightIcon />,
  className,
  children,
  ...props
}: OwnProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      {icon != null && (
        <>
          {" "}
          <ButtonIcon icon={icon} />
        </>
      )}
    </Link>
  );
}

export function Button({
  variant = "primary",
  icon = <ArrowRightIcon />,
  className,
  children,
  type = "button",
  ...props
}: OwnProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...props}>
      {children}
      {icon != null && (
        <>
          {" "}
          <ButtonIcon icon={icon} />
        </>
      )}
    </button>
  );
}
