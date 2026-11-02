import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import KeyValueList from "@/components/ui/KeyValueList";
import Media from "@/components/ui/Media";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { CASES, pick } from "@/lib/cases";
import { CONTACT_EMAIL } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    lead: "Noticias y prensa.",
    tail: "Nodex en los medios.",
    intro: "Anuncios, entrevistas y recursos para periodistas.",
    press: `Contacto de prensa: ${CONTACT_EMAIL}`,
    latest: "Lo último",
    kind: "ENTREVISTA · QONTO",
    title: "Qonto entrevista a Miguel Romero e Iván Ruiz, fundadores de Nodex",
    meta: "Entrevista",
    stories: "Casos de cliente",
    allStories: "Todos los casos",
    read: "Leer el caso",
    kit: "Kit de medios.",
    rows: [
      { label: "Sobre Nodex", value: "Nodex es una empresa de Forward Deployed Engineering. Nuestros ingenieros senior trabajan dentro de los equipos de sus clientes para construir y llevar a producción software, hoy sobre todo sistemas de IA." },
      { label: "Fundadores", value: "Miguel Romero, Founder & CEO · Iván Ruiz, Founder & CTO." },
      { label: "Logo", value: `Bajo petición en ${CONTACT_EMAIL}` },
      { label: "Fotos", value: `Fotos de los fundadores bajo petición en ${CONTACT_EMAIL}` },
      { label: "Contacto de prensa", value: CONTACT_EMAIL },
    ],
  },
  en: {
    lead: "News and press.",
    tail: "Nodex in the media.",
    intro: "Announcements, interviews and resources for journalists.",
    press: `Press contact: ${CONTACT_EMAIL}`,
    latest: "Latest",
    kind: "INTERVIEW · QONTO",
    title: "Qonto interviews Miguel Romero and Iván Ruiz, founders of Nodex",
    meta: "Interview",
    stories: "Client stories",
    allStories: "All client stories",
    read: "Read the story",
    kit: "Media kit.",
    rows: [
      { label: "About Nodex", value: "Nodex is a Forward Deployed Engineering company. Our senior engineers work inside clients’ teams to build and ship software to production, today mostly AI systems." },
      { label: "Founders", value: "Miguel Romero, Founder & CEO · Iván Ruiz, Founder & CTO." },
      { label: "Logo", value: `On request at ${CONTACT_EMAIL}` },
      { label: "Photos", value: `Founder photos on request at ${CONTACT_EMAIL}` },
      { label: "Press contact", value: CONTACT_EMAIL },
    ],
  },
} as const;

export default function NewsTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const linked = CASES.filter((c) => c.route);

  return (
    <>
      <PageHero
        lead={t.lead}
        tail={t.tail}
        intro={t.intro}
        media={["tv", "head", "portal"]}
      />
      <div className="-mt-4 mb-10 px-[var(--hpad)]">
        <div className="mx-auto max-w-[1280px]">
          <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="outline" icon={null}>
            {t.press}
          </ButtonLink>
        </div>
      </div>

      <Section className="py-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:py-12">
        <h2 className="t-h2s">{t.latest}</h2>
        <ul className="mt-8 grid gap-4 min-[761px]:grid-cols-3">
          <li className="flex min-h-[220px] flex-col rounded-2xl border border-line-strong bg-card p-6">
            <Eyebrow tone="brand">{t.kind}</Eyebrow>
            <h3 className="t-pcard mt-3">{t.title}</h3>
            <p className="mt-auto pt-8 text-[14px] text-body">{t.meta}</p>
          </li>
        </ul>
      </Section>

      <Section id="news-stories" className="py-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:py-12">
        <div className="flex items-end justify-between gap-6">
          <h2 className="t-h2s">{t.stories}</h2>
          <ButtonLink href={r.clientStories} variant="outline" size="cta">
            {t.allStories}
          </ButtonLink>
        </div>
        <ul className="mt-8 grid gap-4 min-[561px]:grid-cols-2 min-[961px]:grid-cols-4">
          {linked.map((c) => (
            <li key={c.id}>
              <Link href={r[c.route!]} className="group/c block">
                <div className="overflow-hidden rounded-2xl">
                  <Media variant={c.media} className="aspect-[4/3] rounded-none transition-transform duration-[600ms] ease-brand group-hover/c:scale-[1.04]" />
                </div>
                <p className="mt-3 text-[14px] text-body">
                  {pick(c.client, locale)} · {pick(c.sector, locale)}
                </p>
                <h3 className="mt-1 font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.025em] group-hover/c:text-brand">
                  {pick(c.title, locale)}
                </h3>
                <p className="mt-2 text-[14px] font-medium text-ink">{t.read} →</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="py-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:py-12">
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b">{t.kit}</h2>
          <KeyValueList labelStyle="mono" rows={t.rows} />
        </div>
      </Section>
    </>
  );
}
