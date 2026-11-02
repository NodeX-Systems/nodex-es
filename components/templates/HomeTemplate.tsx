import Link from "next/link";
import ClientVideos, { type ClientPanel } from "@/components/home/ClientVideos";
import HomeHero from "@/components/home/HomeHero";
import { ButtonLink } from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import CtaBanner from "@/components/ui/CtaBanner";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/icons";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { getCase, pick, type Case } from "@/lib/cases";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    heroLead: "Ingeniería de IA empresarial para un impacto de negocio ",
    heroAccent: "medible",
    heroTail: ".",
    heroSub:
      "Forward Deployed Engineers que se integran en tu equipo, trabajan en tu stack y se quedan hasta que la IA funciona en producción.",
    speakTitle: "Nuestros clientes hablan por nosotros",
    readFull: "Leer la historia completa",
    prevStory: "Historia anterior",
    nextStory: "Historia siguiente",
    counter: "Historia {i} de {n}",
    statement: "No asesoramos desde fuera. Construimos desde dentro.",
    stats: [
      { value: 7, suffix: "", unit: "países", text: "Clientes atendidos por Nodex" },
      { value: 20, suffix: "+", unit: "empresas", text: "Con soluciones implementadas por Nodex" },
      { value: 7, suffix: "+", unit: "años", text: "Experiencia mínima de cada ingeniero" },
    ],
    buildTitle: "IA preparada para producción.",
    servicesBtn: "Servicios",
    capabilities: [
      { title: "Agentes de IA", text: "Agentes por dominio y departamento, cada uno con sus propias herramientas." },
      { title: "RAG con fuentes verificables", text: "Cada respuesta enlazada al documento y la versión de la que procede." },
      { title: "Guardrails y revisión humana", text: "Un paso de revisión antes de que nada escriba en tus sistemas." },
      { title: "Orquestación de LLMs", text: "LangGraph, MCP y skills modulares, conectados de forma segura a tus servicios." },
      { title: "Evaluación y monitorización", text: "Precisión, correcciones humanas, tiempo de ciclo y coste, medidos en producción." },
      { title: "Plataformas de datos", text: "Pipelines, arquitectura de datos y modelos predictivos en los que la IA puede apoyarse." },
    ],
    workTitle: "Trabajo en producción",
    allStories: "Todos los casos",
    rows: [
      { key: "services", label: "Servicios", lead: "Una forma de trabajar.", tail: "Cuatro formas de empezar." },
      { key: "howWeWork", label: "Cómo trabajamos", lead: "Dentro de tu equipo", tail: "en una semana." },
      { key: "about", label: "Nosotros", lead: "El equipo", tail: "detrás del trabajo." },
      { key: "clientStories", label: "Casos de cliente", lead: "Trabajo de clientes.", tail: "En producción." },
    ],
    ctaTitle: "Habla de tu proyecto con un ingeniero senior.",
  },
  en: {
    heroLead: "Engineering enterprise AI for ",
    heroAccent: "measurable",
    heroTail: " business impact.",
    heroSub:
      "Forward Deployed Engineers who join your team, work in your stack and stay until AI runs in production.",
    speakTitle: "Our clients speak for us",
    readFull: "Read the full story",
    prevStory: "Previous story",
    nextStory: "Next story",
    counter: "Story {i} of {n}",
    statement: "We don’t advise from the outside. We build from the inside.",
    stats: [
      { value: 7, suffix: "", unit: "countries", text: "Clients served by Nodex" },
      { value: 20, suffix: "+", unit: "companies", text: "With solutions implemented by Nodex" },
      { value: 7, suffix: "+", unit: "years", text: "Minimum experience of every engineer" },
    ],
    buildTitle: "AI built for production.",
    servicesBtn: "Services",
    capabilities: [
      { title: "AI agents", text: "Agents per domain and department, each with its own tools." },
      { title: "RAG with verifiable sources", text: "Every answer linked to the document and version it came from." },
      { title: "Guardrails and human review", text: "A review step before anything writes to your systems." },
      { title: "LLM orchestration", text: "LangGraph, MCP and modular skills, wired safely to your services." },
      { title: "Evaluation and monitoring", text: "Accuracy, human corrections, cycle time and cost, tracked in production." },
      { title: "Data platforms", text: "Pipelines, data architecture and predictive models AI can rely on." },
    ],
    workTitle: "Work in production",
    allStories: "All client stories",
    rows: [
      { key: "services", label: "Services", lead: "One way of working.", tail: "Four ways to start." },
      { key: "howWeWork", label: "How we work", lead: "Inside your team", tail: "in one week." },
      { key: "about", label: "About", lead: "The team", tail: "behind the work." },
      { key: "clientStories", label: "Client stories", lead: "Client work.", tail: "In production." },
    ],
    ctaTitle: "Discuss your project with a senior engineer.",
  },
} as const;

// Panels of the client stage: the cases that have a photo of their own.
// Quotes are added once a client approves one (see ClientPanel).
const STAGE_CASES: readonly Case["id"][] = ["saas", "bbva", "sonnedix", "vestel"];

export default function HomeTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const featured = getCase("sonnedix");

  return (
    <>
      <HomeHero
        lead={t.heroLead}
        accent={t.heroAccent}
        tail={t.heroTail}
        subtitle={t.heroSub}
      />

      {FEATURES.clientVideos ? (
        <section className="border-t border-line pt-[clamp(72px,calc(var(--cqi)*9),140px)] pb-[clamp(24px,calc(var(--cqi)*3),40px)] max-[700px]:pt-[72px] max-[700px]:pb-8">
          <div className="mx-auto max-w-[1360px] px-10 max-[700px]:px-[18px]">
            <h2 className="t-h2-speak mb-[clamp(24px,calc(var(--cqi)*3),48px)]">{t.speakTitle}</h2>
          </div>
          <ClientVideos
            panels={STAGE_CASES.map((id): ClientPanel => {
              const c = getCase(id);
              return {
                id,
                image: c.media,
                client: pick(c.client, locale),
                headline: pick(c.title, locale),
              };
            })}
            labels={{
              prev: t.prevStory,
              next: t.nextStory,
              read: t.readFull,
              href: r.clientStories,
              counter: t.counter,
            }}
          />
        </section>
      ) : null}

      {/* Statement + figures */}
      <Section className="pt-[clamp(64px,calc(var(--cqi)*8),120px)] pb-[clamp(48px,calc(var(--cqi)*5),80px)] max-[700px]:py-[72px]">
        <h2 className="t-h2 max-w-[1000px]">
          {t.statement.split(". ")[0]}.{" "}
          <span className="text-faint">{t.statement.split(". ")[1]}</span>
        </h2>
        {FEATURES.homeStats ? (
          <ul className="mt-[clamp(32px,calc(var(--cqi)*4),64px)] grid gap-3 min-[701px]:grid-cols-3">
            {t.stats.map((s, i) => (
              <Reveal
                as="li"
                kind="item"
                index={i}
                key={s.unit}
                className="flex min-h-[196px] flex-col justify-between rounded-2xl border border-line-strong bg-linear-to-b from-card to-canvas p-[clamp(18px,calc(var(--cqi)*2.4),30px)] max-[700px]:min-h-0 max-[700px]:gap-3 max-[700px]:px-4 max-[700px]:py-[18px]"
              >
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <b className="t-stat font-semibold">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </b>
                  <span className="t-stat-unit">{s.unit}</span>
                </p>
                <p className="text-[15px] leading-[1.45] text-body">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* Built for production */}
      <Section className="py-[clamp(64px,calc(var(--cqi)*8),120px)] max-[700px]:py-[72px]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="t-h2">{t.buildTitle}</h2>
          <ButtonLink href={r.services} variant="outline" className="max-[560px]:hidden">
            {t.servicesBtn}
          </ButtonLink>
        </div>
        <ul className="mt-[clamp(32px,calc(var(--cqi)*4),64px)] grid border-t border-l border-line-strong min-[561px]:grid-cols-2 min-[861px]:grid-cols-3">
          {t.capabilities.map((c, i) => (
            <Reveal
              as="li"
              kind="item"
              index={i % 3}
              key={c.title}
              className="border-r border-b border-line-strong p-[clamp(20px,calc(var(--cqi)*2.2),32px)]"
            >
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h3 className="mt-10 font-display text-[clamp(20px,calc(var(--cqi)*1.6),24px)] font-semibold tracking-[-0.03em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 max-w-[300px] text-[15px] leading-[1.5] text-body">
                {c.text}
              </p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-8 min-[561px]:hidden">
          <ButtonLink href={r.services} variant="outline">
            {t.servicesBtn}
          </ButtonLink>
        </div>
      </Section>

      {/* Work in production (featured case) */}
      <Section className="py-[clamp(64px,calc(var(--cqi)*8),120px)] max-[700px]:py-[72px]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="t-h2">{t.workTitle}</h2>
          <ButtonLink href={r.clientStories} variant="outline" className="max-[560px]:hidden">
            {t.allStories}
          </ButtonLink>
        </div>
        <Link
          href={r.caseSonnedix}
          className="group mt-[clamp(32px,calc(var(--cqi)*4),64px)] grid items-center gap-[clamp(24px,calc(var(--cqi)*4),64px)] min-[761px]:grid-cols-[1.45fr_1fr]"
        >
          <div className="overflow-hidden rounded-2xl">
            <Media
              variant={featured.media}
              className="aspect-[16/10] rounded-none transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.035]"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow className="inline">
                {`${pick(featured.client, locale)} · ${pick(featured.sector, locale)}`}
              </Eyebrow>
              <span className="t-tag rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] text-brand">
                {featured.format}
              </span>
            </div>
            <h3 className="t-h3-case mt-4 transition-colors duration-200 group-hover:text-brand">
              {pick(featured.title, locale)}
            </h3>
          </div>
        </Link>
        <div className="mt-8 min-[561px]:hidden">
          <ButtonLink href={r.clientStories} variant="outline">
            {t.allStories}
          </ButtonLink>
        </div>
      </Section>

      {/* Next: index rows */}
      <Section className="py-[clamp(40px,calc(var(--cqi)*5),80px)] max-[700px]:py-10">
        <ul>
          {t.rows.map((row) => (
            <li key={row.key} className="border-b border-line first:border-t">
              <Link
                href={r[row.key]}
                className="group/row grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-[clamp(20px,calc(var(--cqi)*2),32px)] transition-[padding] duration-300 ease-brand hover:pl-[14px] min-[701px]:grid-cols-[minmax(110px,180px)_1fr_auto]"
              >
                <Eyebrow className="col-span-2 min-[701px]:col-span-1">
                  {row.label}
                </Eyebrow>
                <span className="t-next text-ink transition-colors duration-300">
                  {row.lead} <span className="text-faint group-hover/row:text-ink">{row.tail}</span>
                </span>
                <span className="flex size-12 items-center justify-center rounded-full border border-line-strong text-[14px] text-ink transition-[background-color,color,transform] duration-250 ease-brand group-hover/row:-rotate-45 group-hover/row:border-ink group-hover/row:bg-ink group-hover/row:text-canvas max-[700px]:size-10">
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="cyborg"
      />
    </>
  );
}
