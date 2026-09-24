import { Fragment, type ReactNode } from "react";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import { heading } from "@/components/ui/typography";

/** One h3 with the paragraphs under it. */
export type ServiceSection = { title: ReactNode; paragraphs: ReactNode[] };

// 30px gap (15px below 768px): between two sections of an article and
// between articles.
function Gap30() {
  return <div className="h-[15px] md:h-[30px]" />;
}

function ServiceArticle({
  sections,
  leadingGap,
}: {
  sections: ServiceSection[];
  leadingGap: boolean;
}) {
  return (
    <article>
      {sections.map((section, i) => (
        <Fragment key={i}>
          {(i > 0 || leadingGap) && <Gap30 />}
          <h3 className={heading.h3}>{section.title}</h3>
          {section.paragraphs.map((paragraph, j) => (
            <p key={j} className={`mt-4 ${heading.p}`}>
              {paragraph}
            </p>
          ))}
        </Fragment>
      ))}
    </article>
  );
}

// Centered text column under the intro band: the service's articles, then
// the FAQ accordion.
export default function ServiceDetails({
  articles,
  faq,
  leadingGap = false,
}: {
  /** Each article is a list of sections. */
  articles: ServiceSection[][];
  faq: AccordionItem[];
  /** Extra 30px gap above the first heading (not on every service page). */
  leadingGap?: boolean;
}) {
  return (
    <div className="py-[50px] md:py-25">
      <Container>
        <div className="-mx-3 flex flex-wrap">
          <div className="mx-auto w-full shrink-0 px-3 lg:w-2/3">
            {articles.map((sections, i) => (
              <Fragment key={i}>
                {i > 0 && <Gap30 />}
                <ServiceArticle
                  sections={sections}
                  leadingGap={i === 0 && leadingGap}
                />
              </Fragment>
            ))}
            <div className="h-2.5 md:h-5" />
            <Accordion items={faq} />
          </div>
        </div>
      </Container>
    </div>
  );
}
