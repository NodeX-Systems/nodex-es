import Link from "next/link";
import CtaBanner from "@/components/ui/CtaBanner";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/icons";
import Media from "@/components/ui/Media";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { CASES, pick, type Case } from "@/lib/cases";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    lead: "Trabajo de clientes.",
    tail: "En producción.",
    intro:
      "Sistemas que hemos construido dentro de los equipos de nuestros clientes, desde agentes de IA hasta plataformas de datos. Cada caso se publica con la aprobación del cliente.",
    read: "Leer el caso",
    ctaTitle: "Habla de tu proyecto con un ingeniero senior.",
  },
  en: {
    lead: "Client work.",
    tail: "In production.",
    intro:
      "Systems we’ve built inside our clients’ teams, from AI agents to data platforms. Each case is published with the client’s approval.",
    read: "Read the case",
    ctaTitle: "Discuss your project with a senior engineer.",
  },
} as const;

function CaseCard({
  c,
  locale,
  read,
  featured,
  index,
}: {
  c: Case;
  locale: Locale;
  read: string;
  featured?: boolean;
  index: number;
}) {
  const r = ROUTES[locale];
  const body = (
    <>
      <div className="overflow-hidden rounded-2xl max-[700px]:size-[76px] max-[700px]:shrink-0">
        <Media
          variant={c.media}
          sizes="(max-width: 700px) 76px, 50vw"
          className={`rounded-none transition-transform duration-[1200ms] ease-brand group-hover/case:scale-[1.035] max-[700px]:aspect-square max-[700px]:size-full ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
        />
      </div>
      <div className={featured ? "min-[761px]:self-center max-[700px]:min-w-0" : "mt-5 max-[700px]:mt-0 max-[700px]:min-w-0"}>
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow className="inline">
            {`${pick(c.client, locale)} · ${pick(c.sector, locale)}`}
          </Eyebrow>
          <span className="t-tag rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] text-brand">
            {c.format}
          </span>
        </div>
        <h2
          className={`mt-3 text-ink max-[700px]:!text-[17px] transition-colors duration-200 group-hover/case:text-brand ${featured ? "t-h3-case" : "t-pcard"}`}
        >
          {pick(c.title, locale)}
        </h2>
        {c.metrics ? (
          <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {c.metrics.map((m) => (
              <span key={m.value} className="flex items-baseline gap-2">
                <b className="font-display text-[28px] font-semibold tracking-[-0.04em]">{m.value}</b>
                <span className="text-[14px] text-body">{pick(m.label, locale)}</span>
              </span>
            ))}
          </p>
        ) : null}
        {c.summary && !c.metrics ? (
          <p className="mt-3 max-w-[480px] text-[16px] leading-[1.5] text-body">
            {pick(c.summary, locale)}
          </p>
        ) : null}
        {c.route ? (
          <p className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
            {read}
            <ArrowIcon className="text-[12px] transition-transform duration-250 ease-brand group-hover/case:translate-x-1" />
          </p>
        ) : null}
      </div>
    </>
  );

  const cls = featured
    ? "group/case grid gap-x-10 gap-y-5 min-[761px]:grid-cols-[1.45fr_1fr] max-[700px]:flex max-[700px]:gap-4"
    : "group/case block max-[700px]:flex max-[700px]:gap-4";

  return (
    <Reveal
      as="li"
      kind="item"
      index={index % 2}
      className={featured ? "min-w-0 list-none min-[761px]:col-span-2" : "min-w-0 list-none"}
    >
      {c.route ? (
        <Link href={r[c.route]} className={cls}>
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </Reveal>
  );
}

export default function ClientStoriesTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const [featured, ...rest] = CASES;

  return (
    <>
      <PageHero
        lead={t.lead}
        tail={t.tail}
        intro={t.intro}
        media={["hole", "tv", "cyborg"]}
      />
      <Section
        reveal={false}
        className="pt-[clamp(16px,calc(var(--cqi)*2),32px)] pb-[clamp(40px,calc(var(--cqi)*5),72px)] max-[700px]:pb-10"
        divider={false}
      >
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-14 min-[761px]:grid-cols-2">
          <CaseCard c={featured} locale={locale} read={t.read} featured index={0} />
          {rest.map((c, i) => (
            <CaseCard key={c.id} c={c} locale={locale} read={t.read} index={i} />
          ))}
        </ul>
      </Section>
      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="head"
      />
    </>
  );
}
