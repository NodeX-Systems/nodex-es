import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { AngleRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

// The inner-page title band (.common-hero): page title plus a
// "Home > Current page" breadcrumb. `width` is the title column from lg up:
// "half" (the old .col-lg-6) or "wide" (.col-lg-10, the service pages'
// long titles).
export default function PageHero({
  title,
  homeHref,
  homeLabel,
  current,
  width = "half",
}: {
  title: ReactNode;
  homeHref: string;
  /** Without a trailing space; it is added here. */
  homeLabel: ReactNode;
  current: ReactNode;
  width?: "half" | "wide";
}) {
  return (
    <div className="flex items-center bg-surface max-lg:pt-[50px] max-lg:pb-2.5 lg:h-[250px]">
      <Container>
        <div className="-mx-3 flex flex-wrap">
          <div
            className={cn(
              "mx-auto w-full shrink-0 px-3 text-center",
              width === "wide" ? "lg:w-5/6" : "lg:w-1/2",
            )}
          >
            <div className="pt-[50px]">
              <h1 className="text-[40px] leading-10 font-bold text-ink lg:text-[64px] lg:leading-16">
                {title}
              </h1>
              <div className="flex items-center justify-center pt-4 text-lg leading-7 font-medium text-ink">
                <Link href={homeHref} className="inline-block">
                  {homeLabel}{" "}
                </Link>
                <span className="inline-block px-[5px]">
                  <AngleRightIcon />
                </span>
                <p className="inline-block font-bold">{current}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
