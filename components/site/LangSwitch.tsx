"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { switchLocalePath, type Locale } from "@/lib/routes";

// EN | ES toggle that keeps the visitor on the same page.
export default function LangSwitch({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center", className)}
    >
      {(["en", "es"] as const).map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={switchLocalePath(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex h-11 items-center px-2 font-mono text-[13px] font-medium uppercase transition-colors duration-200 pointer-coarse:min-w-11",
              active ? "text-ink" : "text-body hover:text-ink",
            )}
          >
            {target}
          </Link>
        );
      })}
    </div>
  );
}
