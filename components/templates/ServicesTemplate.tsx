import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import CtaBanner from "@/components/ui/CtaBanner";
import Eyebrow from "@/components/ui/Eyebrow";
import Media, { type MediaVariant } from "@/components/ui/Media";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale, type RouteKey } from "@/lib/routes";

type Format = {
  id: string;
  name: string;
  kicker: string;
  text: string;
  bestWhen: string;
  media: MediaVariant;
  case?: { route: RouteKey; label: string };
};

const CONTENT = {
  es: {
    heroLead: "Una forma de trabajar.",
    heroTail: "Cuatro formas de empezar.",
    heroIntro:
      "Pidas lo que pidas, un ingeniero, un equipo o un proyecto completo, recibes Forward Deployed Engineers: se integran en tu equipo, encuentran el problema real y construyen desde ahí.",
    includedLine:
      "Cada formato empieza entendiendo el problema. Está incluido, no se vende aparte.",
    bestWhen: "Mejor cuando",
    startHere: "Empieza aquí",
    formats: [
      {
        id: "f-ship",
        name: "Ship AI",
        kicker: "De los datos a la IA en producción",
        text: "Fundamentos de datos, RAG, agentes y flujos con LLMs llevados a producción, con guardrails, revisión humana y monitorización.",
        bestWhen: "tienes un caso de uso de IA y necesitas que funcione, no otro piloto.",
        media: "cyborg",
        case: { route: "caseSonnedix", label: "Ver el caso de Sonnedix" },
      },
      {
        id: "f-embed",
        name: "Embed",
        kicker: "Forward Deployed Engineers en tu equipo",
        text: "Un Forward Deployed Engineer o un equipo completo, trabajando con tus herramientas y a tu ritmo, en una semana.",
        bestWhen: "tu roadmap necesita manos senior ya.",
        media: "head",
      },
      {
        id: "f-build",
        name: "Build",
        kicker: "Productos construidos de extremo a extremo",
        text: "Un producto o plataforma desde la arquitectura hasta la entrega, con tu equipo listo para operarlo.",
        bestWhen: "necesitas algo nuevo y no tienes el equipo para construirlo.",
        media: "map",
      },
      {
        id: "f-unblock",
        name: "Unblock",
        kicker: "Recuperación de proyectos",
        text: "Cuando un proyecto está atascado, es lento o demasiado caro, entramos, lo desenredamos y volvemos a ponerlo en marcha.",
        bestWhen: "los plazos se retrasan o los costes cloud no paran de crecer.",
        media: "hole",
        case: { route: "caseSaas", label: "Ver el caso" },
      },
    ] satisfies Format[],
    securityMore: "Más detalle en Seguridad y confianza",
    faqTitle: "Preguntas antes de la llamada.",
    faq: [
      { q: "¿Podemos empezar con un solo ingeniero?", a: "Sí. Muchos proyectos empiezan con un único Forward Deployed Engineer. Si el problema necesita más, ampliamos el equipo poco a poco y solo cuando está justificado." },
      { q: "¿Qué tan rápido podéis empezar?", a: "Normalmente en la semana siguiente a la llamada de alcance: los primeros días se dedican a acordar el enfoque y las prioridades, y después el ingeniero se incorpora a tus herramientas y rituales." },
      { q: "¿Cuánto cuesta?", a: "Depende del formato y del tamaño del equipo. Tras la llamada de alcance te damos una estimación clara y una forma de trabajar, sin compromiso y sin pago antes de que decidas." },
      { q: "¿De quién es lo que construimos?", a: "Tuyo. El código, la documentación y la infraestructura son tuyos desde el primer día." },
      { q: "¿Trabajáis en remoto o presencial?", a: "Ambas. Estamos en Valencia y trabajamos en remoto o en tus oficinas, según lo que encaje mejor con tu equipo." },
      { q: "¿Firmáis un NDA?", a: "Sí. Firmamos un NDA estándar con cada cliente y proveedor antes de ver nada." },
      { q: "¿Podemos parar cuando queramos?", a: "Sí. No hay permanencia: decides cuándo termina y te entregamos el código, la documentación y la infraestructura." },
      { q: "¿Qué pasa con nuestros datos?", a: "Siguen siendo tuyos y se quedan en tu entorno. No los usamos para entrenar modelos ni para ningún otro cliente." },
    ],
    ctaTitle: "¿No sabes qué formato encaja? Te aconsejamos en la primera llamada.",
  },
  en: {
    heroLead: "One way of working.",
    heroTail: "Four ways to start.",
    heroIntro:
      "Whatever you ask for, one engineer, a team or a full project, you get Forward Deployed Engineers: they embed in your team, find the real problem and build from there.",
    includedLine:
      "Every format starts by understanding the problem. It’s included, not sold separately.",
    bestWhen: "Best when",
    startHere: "Start here",
    formats: [
      {
        id: "f-ship",
        name: "Ship AI",
        kicker: "From data to AI in production",
        text: "Data foundations, RAG, agents and LLM workflows taken to production, with guardrails, human review and monitoring.",
        bestWhen: "you have an AI use case and need it running, not another pilot.",
        media: "cyborg",
        case: { route: "caseSonnedix", label: "See the Sonnedix case" },
      },
      {
        id: "f-embed",
        name: "Embed",
        kicker: "Forward Deployed Engineers in your team",
        text: "One Forward Deployed Engineer or a full team, working in your tools and at your cadence, within one week.",
        bestWhen: "your roadmap needs senior hands now.",
        media: "head",
      },
      {
        id: "f-build",
        name: "Build",
        kicker: "Products built end to end",
        text: "A product or platform from architecture to handover, with your team ready to run it.",
        bestWhen: "you need something new and don’t have the team to build it.",
        media: "map",
      },
      {
        id: "f-unblock",
        name: "Unblock",
        kicker: "Project recovery",
        text: "When a project is stuck, slow or too expensive, we step in, untangle it and get it shipping again.",
        bestWhen: "deadlines keep slipping or cloud costs keep growing.",
        media: "hole",
        case: { route: "caseSaas", label: "See the case" },
      },
    ] satisfies Format[],
    securityMore: "More in Security and trust",
    faqTitle: "Questions before the call.",
    faq: [
      { q: "Can we start with one engineer?", a: "Yes. Many engagements start with a single Forward Deployed Engineer. If the problem needs more, we grow the team gradually and only when it’s justified." },
      { q: "How fast can you start?", a: "Usually within a week of the scoping call: the first days go into agreeing the approach and priorities, then the engineer joins your tools and rituals." },
      { q: "How much does it cost?", a: "It depends on the format and the team size. After the scoping call we give you a clear estimate and a way of working, with no commitment and no payment before you decide." },
      { q: "Who owns what we build?", a: "You do. The code, the documentation and the infrastructure are yours from day one." },
      { q: "Do you work remotely or on site?", a: "Both. We’re based in Valencia, Spain, and work remotely or on site, whichever suits your team." },
      { q: "Do you sign an NDA?", a: "Yes. We sign a standard NDA with every client and supplier before we see anything." },
      { q: "Can we stop whenever we want?", a: "Yes. There is no lock-in: you decide when it ends, and we hand over the code, documentation and infrastructure." },
      { q: "What happens to our data?", a: "It stays yours and stays in your environment. We don’t use it to train models or for any other client." },
    ],
    ctaTitle: "Not sure which format fits? We’ll advise you on the first call.",
  },
} as const;

export default function ServicesTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const cta = NAV_LABELS[locale].scopingCall;
  const slug = { "f-ship": "ship-ai", "f-embed": "embed", "f-build": "build", "f-unblock": "unblock" } as const;

  return (
    <>
      <PageHero
        lead={t.heroLead}
        tail={t.heroTail}
        intro={t.heroIntro}
        cta={{ href: r.contact, label: cta }}
        media={["tv", "glitch", "scan"]}
      />

      <Section
        id="fmts"
        reveal={false}
        className="pt-[clamp(40px,calc(var(--cqi)*5),72px)] pb-[clamp(72px,calc(var(--cqi)*9),140px)] max-[700px]:py-16"
      >
        <p className="max-w-[460px] font-display text-[clamp(20px,calc(var(--cqi)*1.7),26px)] leading-[1.2] font-semibold tracking-[-0.03em] text-brand">
          {t.includedLine}
        </p>
        <div className="mt-[clamp(32px,calc(var(--cqi)*3.5),56px)] grid gap-x-14 gap-y-14 min-[761px]:grid-cols-2 max-[1024px]:gap-x-8">
          {t.formats.map((f, i) => (
            <Reveal as="article" kind="item" index={i % 2} key={f.id} id={f.id} className="scroll-mt-24">
              <Media
                variant={f.media}
                className="aspect-[16/10] max-[560px]:float-left max-[560px]:mr-4 max-[560px]:mb-2 max-[560px]:aspect-square max-[560px]:w-[104px]"
              />
              <div className="mt-6 flex items-baseline gap-3 max-[560px]:mt-0">
                <span className="t-tag text-body">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="t-h2-format">{f.name}</h2>
              </div>
              <Eyebrow tone="brand" className="mt-2">
                {f.kicker}
              </Eyebrow>
              <p className="mt-4 max-w-[480px] text-[17px] leading-[1.5] text-body max-[1024px]:text-[16px]">
                {f.text}
              </p>
              <p className="mt-3 max-w-[480px] text-[16px] leading-[1.5] text-ink">
                <span className="t-tag mr-2 text-body">{t.bestWhen}</span>
                {f.bestWhen}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <ButtonLink
                  href={`${r.contact}?format=${slug[f.id as keyof typeof slug]}`}
                  variant="outline"
                  size="cta"
                >
                  {t.startHere}
                </ButtonLink>
                {"case" in f && f.case ? (
                  <Link
                    href={r[f.case.route]}
                    className="flex min-h-10 items-center border-b border-line-strong text-[15px] text-body transition-colors hover:border-brand hover:text-ink"
                  >
                    {f.case.label}
                  </Link>
                ) : null}
                {FEATURES.formatOnePager ? (
                  <span className="text-[15px] text-body">
                    {locale === "es" ? "Descargar el one-pager (PDF)" : "Download the one-pager (PDF)"}
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:py-16">
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b">{t.faqTitle}</h2>
          <Accordion
            items={t.faq.map((f, i) => ({
              question: f.q,
              answer:
                i === t.faq.length - 1 ? (
                  <>
                    {f.a}{" "}
                    <Link
                      href={r.security}
                      className="border-b border-line-strong font-medium text-ink hover:border-brand"
                    >
                      {t.securityMore} →
                    </Link>
                  </>
                ) : (
                  f.a
                ),
            }))}
          />
        </div>
      </Section>

      <CtaBanner title={t.ctaTitle} label={cta} href={r.contact} variant="beams" position="50% 45%" />
    </>
  );
}
