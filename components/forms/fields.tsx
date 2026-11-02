import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Form field primitives shared by the contact wizard and the careers form.
// Colours come from the --f-* variables the surrounding form sets, so the
// same fields work on the light page and on the dark contact panel.

export const inputClass =
  "h-12 w-full rounded-xl border bg-transparent px-[14px] py-3 font-sans text-[16px] text-(--f-text) placeholder:text-(--f-muted) border-(--f-border) transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-(--f-focus) focus:shadow-[0_0_0_3px_var(--f-ring)] aria-[invalid=true]:border-(--f-err)";

export function Field({
  label,
  error,
  optional,
  htmlFor,
  className,
  children,
}: {
  label: ReactNode;
  error?: string;
  optional?: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-[14px] font-medium text-(--f-text)"
        >
          {label}
          {optional ? (
            <span className="ml-1.5 font-normal text-(--f-muted)">{optional}</span>
          ) : null}
        </label>
        {error ? (
          <span
            id={`${htmlFor}-err`}
            role="alert"
            className="truncate text-[12.5px] font-medium text-(--f-err) max-[700px]:hidden"
          >
            {error}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <span
          aria-hidden="true"
          className="mt-1.5 hidden text-[12.5px] font-medium text-(--f-err) max-[700px]:block"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Input({
  error,
  id,
  className,
  ...props
}: ComponentProps<"input"> & { error?: string; id: string }) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={cn(inputClass, className)}
      {...props}
    />
  );
}

export function Select({
  error,
  id,
  className,
  children,
  ...props
}: ComponentProps<"select"> & { error?: string; id: string }) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={cn(inputClass, "appearance-none bg-no-repeat pr-10", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%238da4a8' stroke-width='1.5'><path d='m1 1 5 5 5-5'/></svg>\")",
        backgroundPosition: "right 14px center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  error,
  id,
  className,
  ...props
}: ComponentProps<"textarea"> & { error?: string; id: string }) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={cn(inputClass, "h-auto min-h-[120px] resize-y", className)}
      {...props}
    />
  );
}

// CSS variables for the light page (default) and for the contact panel, which
// is light up to 900px and dark above. Written out in full so Tailwind can
// see every class.
export const lightFormVars =
  "[--f-text:#0b1317] [--f-muted:#7d8d90] [--f-border:#c3cfcd] [--f-focus:#1e5e56] [--f-ring:rgba(30,94,86,0.16)] [--f-err:#b42318]";
export const contactPanelVars =
  "[--f-text:#0b1317] [--f-muted:#7d8d90] [--f-border:#c3cfcd] [--f-focus:#1e5e56] [--f-ring:rgba(30,94,86,0.16)] [--f-err:#b42318] min-[901px]:[--f-text:#f2f4f3] min-[901px]:[--f-muted:#8da4a8] min-[901px]:[--f-border:#2b3d43] min-[901px]:[--f-focus:#caede7] min-[901px]:[--f-ring:rgba(202,237,231,0.18)] min-[901px]:[--f-err:#ff9c8a]";
