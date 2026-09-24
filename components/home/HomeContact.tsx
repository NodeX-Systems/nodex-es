import Image from "next/image";
import type { ReactNode } from "react";
import LeadForm from "@/components/forms/LeadForm";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { heading, headingOnDark } from "@/components/ui/typography";
import { CONTACT_EMAIL, FORM_ENDPOINTS } from "@/lib/constants";
import type { Locale } from "@/lib/routes";
import mailIcon from "@/public/assets/img/icons/contact-icon2.png";

// .contact1 .contact1-form .single-input input/textarea
const FIELD =
  "mt-5 w-full rounded-[4px] border border-[#E6E7E9] p-4 text-lg leading-[18px] font-medium text-[#525863] focus:outline-none " +
  "placeholder:text-lg placeholder:leading-[18px] placeholder:font-medium placeholder:text-[#525863]";

// Home-page contact block (.contact1): heading + email card on the left,
// the contact form card on the right.
export default function HomeContact({
  locale,
  eyebrow,
  title,
  text,
  emailLabel,
  formTitle,
  formText,
  placeholders,
  submitLabel,
}: {
  locale: Locale;
  eyebrow: ReactNode;
  title: ReactNode;
  text: ReactNode;
  emailLabel: ReactNode;
  formTitle: ReactNode;
  formText: ReactNode;
  placeholders: { name: string; email: string; phone: string; message: string };
  submitLabel: ReactNode;
}) {
  return (
    <div className="overflow-x-clip bg-ink py-[50px] md:py-25">
      <Container>
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <div className="lg:pr-[60px]">
              <Reveal
                as="span"
                effect="zoom-in-left"
                duration={700}
                className={headingOnDark.eyebrow}
              >
                {eyebrow}
              </Reveal>
              <SplitText as="h2" className={headingOnDark.h2}>
                {title}
              </SplitText>
              <div className="h-4" />
              <Reveal as="p" effect="fade-right" duration={900} className={headingOnDark.p}>
                {text}
              </Reveal>

              <Reveal effect="fade-right" duration={1100}>
                <div className="mt-[30px] flex items-center rounded-[4px] bg-white px-8 py-6 transition-all duration-400 ease-[ease] hover:-translate-y-2.5">
                  <div className="mr-5 size-[70px] rounded-full bg-white text-center leading-[80px]">
                    <Image
                      src={mailIcon}
                      alt=""
                      className="[filter:brightness(0)_saturate(100%)_invert(32%)_sepia(40%)_saturate(700%)_hue-rotate(118deg)_brightness(85%)]"
                    />
                  </div>
                  <div>
                    <p className="text-lg leading-[18px] font-medium text-body">
                      {emailLabel}
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-block pt-4 text-2xl leading-6 font-bold text-ink transition-all duration-400 ease-[ease] hover:text-brand"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="w-full shrink-0 px-3 lg:w-1/2">
            <Reveal
              effect="zoom-out"
              duration={900}
              className="rounded-[4px] bg-white p-8 max-lg:mt-[30px]"
            >
              <div>
                <h3 className="text-2xl leading-6 font-bold text-ink transition-all duration-400 ease-[ease]">
                  {formTitle}
                </h3>
                <div className="h-4" />
                <p className={heading.p}>{formText}</p>
              </div>
              <div className="h-[5px] md:h-2.5" />

              <LeadForm
                endpoint={FORM_ENDPOINTS.contact}
                kind="contact"
                locale={locale}
                submitLabel={submitLabel}
                className="-mx-3 flex flex-wrap"
                submitWrapperClassName="mt-5 w-full shrink-0 px-3 text-end"
              >
                <div className="w-full shrink-0 px-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={placeholders.name}
                      required
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className="w-full shrink-0 px-3 md:w-1/2">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={placeholders.email}
                      required
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className="w-full shrink-0 px-3 md:w-1/2">
                  <div>
                    <input
                      type="number"
                      name="phone"
                      placeholder={placeholders.phone}
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className="w-full shrink-0 px-3">
                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={placeholders.message}
                      className={FIELD}
                    ></textarea>
                  </div>
                </div>
              </LeadForm>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
