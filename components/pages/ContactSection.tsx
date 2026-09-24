import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { heading } from "@/components/ui/typography";

// The `.contact-page` section shared by /contact/ and /job-application/:
// intro heading on the left, the `.contact1-form` card on the right (stacked
// below 992px). The form itself is passed as `children`.

// Bootstrap `.row` / `.col-*` equivalents for the form grid.
export const formRowClass = "-mx-3 flex flex-wrap";
export const fieldColClass = "w-full shrink-0 px-3";
export const halfFieldColClass = "w-full shrink-0 px-3 md:w-1/2";
// `.contact-page .contact1-form .button`
export const submitColClass = "mt-5 w-full shrink-0 px-3 text-end";

// `.contact-page .contact1-form .single-input input, … textarea`
export const inputClass =
  "mt-5 w-full bg-[#E9E8E9] p-4 text-lg leading-[26px] font-medium text-[#60656E] placeholder:text-[#60656E] focus:outline-none";

export default function ContactSection({
  eyebrow,
  title,
  intro,
  formTitle,
  formIntro,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  formTitle: ReactNode;
  formIntro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pt-[50px] pb-[50px] md:pb-25 lg:pt-[30px]">
      <Container>
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 self-start px-3 lg:w-1/2">
            <div>
              <span className={heading.eyebrow}>{eyebrow}</span>
              <h2 className={heading.h2}>{title}</h2>
              <div className="h-4" />
              <p className={heading.p}>{intro}</p>
            </div>
          </div>

          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <div className="rounded-[4px] bg-surface p-8 lg:ml-[30px]">
              <div>
                <h3 className={heading.h3}>{formTitle}</h3>
                <div className="h-4" />
                <p className={heading.p}>{formIntro}</p>
              </div>
              <div className="h-[5px] md:h-2.5" />

              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
