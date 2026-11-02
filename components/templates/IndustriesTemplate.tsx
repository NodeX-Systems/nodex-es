import Link from "next/link";
import CtaBanner from "@/components/ui/CtaBanner";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/icons";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { NAV_LABELS, ROUTES, type Locale, type RouteKey } from "@/lib/routes";

type Item = { name: string; text: string; route?: RouteKey };
type Industry = { label: string; title: string; items: readonly Item[] };

const CONTENT = {
  es: {
    heroLead: "Industrias.",
    heroTail: "Dónde hemos construido.",
    heroIntro:
      "Nuestra forma de trabajar no cambia según el sector. El contexto sí: la regulación, los sistemas y lo que está en juego.",
    industries: [
      {
        label: "Energía",
        title: "Datos, trazabilidad e IA para empresas de energía.",
        items: [
          { name: "Sonnedix", text: "Una capa de datos, pipelines RAG y agentes con guardrails", route: "caseSonnedix" },
          { name: "Guía Repsol, con Econocom", text: "Una arquitectura para la app de consumo, el portal de hostelería y el back office" },
        ],
      },
      {
        label: "Banca y pagos",
        title: "Integraciones donde cada flujo tiene que ser correcto.",
        items: [{ name: "BBVA", text: "Integraciones de APIs de pago validadas de extremo a extremo" }],
      },
      {
        label: "Industria e ingeniería",
        title: "Reporting y modelos predictivos para ingenierías.",
        items: [{ name: "Vestel Ingenieros", text: "Reporting que dejó de colapsar y modelos predictivos de coste y carga del equipo" }],
      },
      {
        label: "Tecnología y SaaS",
        title: "Plataformas que escalan y cuestan menos de operar.",
        items: [
          { name: "Confidencial · Plataforma SaaS", text: "+40% de rendimiento de carga, −30% de coste cloud", route: "caseSaas" },
          { name: "Confidencial · Sistemas distribuidos", text: "Agentes de IA que leen los logs, escriben la documentación y ayudan a depurar" },
        ],
      },
      {
        label: "Logística",
        title: "Datos e IA para operaciones logísticas.",
        items: [{ name: "Impackta", text: "Sistemas de datos e IA construidos dentro del equipo de operaciones" }],
      },
      {
        label: "Salud",
        title: "Datos y analítica para el sector salud.",
        items: [{ name: "Llamalitica", text: "Plataformas de datos y analítica construidas con el equipo del cliente" }],
      },
    ] satisfies Industry[],
    ctaTitle: "¿Te enfrentas a un reto parecido?",
  },
  en: {
    heroLead: "Industries.",
    heroTail: "Where we’ve built.",
    heroIntro:
      "The way we work doesn’t change by sector. The context does: the regulation, the systems and what’s at stake.",
    industries: [
      {
        label: "Energy",
        title: "Data, traceability and AI for energy companies.",
        items: [
          { name: "Sonnedix", text: "One data layer, RAG pipelines and agents with guardrails", route: "caseSonnedix" },
          { name: "Guía Repsol, with Econocom", text: "One architecture for the consumer app, the hospitality portal and the back office" },
        ],
      },
      {
        label: "Banking and payments",
        title: "Integrations where every flow has to be right.",
        items: [{ name: "BBVA", text: "Payment API integrations validated end to end" }],
      },
      {
        label: "Industry and engineering",
        title: "Reporting and predictive models for engineering firms.",
        items: [{ name: "Vestel Ingenieros", text: "Reporting that stopped collapsing, and predictive models on cost and team load" }],
      },
      {
        label: "Technology and SaaS",
        title: "Platforms that scale, and cost less to run.",
        items: [
          { name: "Confidential · SaaS platform", text: "+40% load performance, −30% cloud cost", route: "caseSaas" },
          { name: "Confidential · Distributed systems", text: "AI agents that read the logs, write the docs and help debug" },
        ],
      },
      {
        label: "Logistics",
        title: "Data and AI for logistics operations.",
        items: [{ name: "Impackta", text: "Data and AI systems built inside the operations team" }],
      },
      {
        label: "Healthcare",
        title: "Data and analytics for healthcare.",
        items: [{ name: "Llamalitica", text: "Data and analytics platforms built with the client’s team" }],
      },
    ] satisfies Industry[],
    ctaTitle: "Facing a similar challenge?",
  },
} as const;

export default function IndustriesTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];

  return (
    <>
      <PageHero
        lead={t.heroLead}
        tail={t.heroTail}
        intro={t.heroIntro}
        cta={{ href: r.contact, label: NAV_LABELS[locale].scopingCall }}
        media={["map", "beams", "globe"]}
      />

      <Section className="pt-[clamp(40px,calc(var(--cqi)*5),72px)] pb-[clamp(40px,calc(var(--cqi)*5),72px)] max-[700px]:py-16">
        <ul className="grid gap-4 min-[761px]:grid-cols-2">
          {t.industries.map((ind) => (
            <li
              key={ind.label}
              className="flex flex-col rounded-2xl border border-line bg-card p-6 lg:p-7"
            >
              <Eyebrow tone="brand">{ind.label}</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(24px,calc(var(--cqi)*2.2),32px)] leading-[1.05] font-semibold tracking-[-0.04em] text-ink">{ind.title}</h2>
              <ul className="mt-auto pt-8">
                {ind.items.map((item) => {
                  const body = (
                    <>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold text-ink">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-[1.45] text-body">
                          {item.text}
                        </span>
                      </span>
                      {item.route ? (
                        <ArrowIcon className="shrink-0 text-[14px] text-ink" />
                      ) : null}
                    </>
                  );
                  return (
                    <li key={item.name} className="border-t border-line first:mt-0">
                      {item.route ? (
                        <Link
                          href={r[item.route]}
                          className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-brand"
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between gap-4 py-3.5">
                          {body}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="hole"
      />
    </>
  );
}
