import Link from "next/link";
import CaseTrack from "@/components/templates/CaseTrack";
import CtaBanner from "@/components/ui/CtaBanner";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowLeftIcon, ArrowIcon } from "@/components/ui/icons";
import KeyValueList from "@/components/ui/KeyValueList";
import Media from "@/components/ui/Media";
import { getCase, pick } from "@/lib/cases";
import { cn } from "@/lib/cn";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

type CaseId = "sonnedix" | "saas";

const CONTENT = {
  es: {
    back: "Todos los casos de cliente",
    result: "Resultado",
    ctaTitle: "¿Te enfrentas a un reto parecido?",
    formatLabel: "Formato",
    sonnedix: {
      lead: "Una capa de datos.",
      tail: "IA encima, con guardrails.",
      intro:
        "Una única fuente de verdad para todos los departamentos, con pipelines RAG y agentes que van de la evaluación de riesgos al borrador de notificaciones, bajo revisión humana.",
      resultTitle: "Trazabilidad completa del documento de origen a la respuesta.",
      resultSub: "Una arquitectura que no depende de un solo proveedor de LLM.",
      docs: [
        { name: "Contrato de conexión a red", ref: "v3 · p. 12" },
        { name: "Política de permisos 2026", ref: "v1 · §4.2" },
        { name: "Informe de activos T2", ref: "v2 · tabla 7" },
      ],
      answer: "«Notificación requerida en un plazo de 30 días desde el cambio.»",
      source: "Fuente: Política de permisos 2026 · v1 · §4.2",
      rows: [
        { label: "Reto", value: "Cada departamento tenía sus propios datos y documentos, así que ninguna respuesta podía rastrearse hasta su fuente." },
        { label: "Qué construimos", value: "Una capa de datos compartida · Pipelines RAG con citas · Agentes con guardrails · Chat sobre el RAG · Observabilidad con OpenTelemetry" },
        { label: "Stack", value: "React · FastAPI · Pydantic AI · LiteLLM · pgvector" },
      ],
    },
    saas: {
      lead: "Más rápida de cargar.",
      tail: "Más barata de operar.",
      intro:
        "Una plataforma SaaS cuyo rendimiento y factura cloud frenaban el producto. Optimizamos la plataforma y sus algoritmos de emparejamiento.",
      resultTitle: "",
      resultSub: "",
      rows: [
        { label: "Reto", value: "La plataforma se ralentizaba bajo carga mientras su factura cloud no dejaba de crecer." },
        { label: "Qué hicimos", value: "Optimizamos la plataforma y sus algoritmos de emparejamiento." },
      ],
    },
  },
  en: {
    back: "All client stories",
    result: "Result",
    ctaTitle: "Facing a similar challenge?",
    formatLabel: "Format",
    sonnedix: {
      lead: "One data layer.",
      tail: "AI on top, with guardrails.",
      intro:
        "A single source of truth for every department, with RAG pipelines and agents that go from risk assessment to draft notifications, under human review.",
      resultTitle: "Full traceability from source document to answer.",
      resultSub: "An architecture that doesn’t depend on one LLM provider.",
      docs: [
        { name: "Grid connection contract", ref: "v3 · p. 12" },
        { name: "Permitting policy 2026", ref: "v1 · §4.2" },
        { name: "Asset report Q2", ref: "v2 · table 7" },
      ],
      answer: "“Notification required within 30 days of the change.”",
      source: "Source: Permitting policy 2026 · v1 · §4.2",
      rows: [
        { label: "Challenge", value: "Every department had its own data and documents, so no answer could be traced back to its source." },
        { label: "What we built", value: "A shared data layer · RAG pipelines with citations · Agents with guardrails · Chat over the RAG · Observability with OpenTelemetry" },
        { label: "Stack", value: "React · FastAPI · Pydantic AI · LiteLLM · pgvector" },
      ],
    },
    saas: {
      lead: "Faster to load.",
      tail: "Cheaper to run.",
      intro:
        "A SaaS platform whose performance and cloud bill were holding the product back. We optimised the platform and its matching algorithms.",
      resultTitle: "",
      resultSub: "",
      rows: [
        { label: "Challenge", value: "The platform slowed down under load while its cloud bill kept growing." },
        { label: "What we did", value: "We optimised the platform and its matching algorithms." },
      ],
    },
  },
} as const;

export default function CaseStoryTemplate({
  locale,
  caseId,
}: {
  locale: Locale;
  caseId: CaseId;
}) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const c = getCase(caseId);
  const story = t[caseId];
  const formatHref = caseId === "sonnedix" ? r.svcShipAi : r.svcUnblock;

  return (
    <>
      <CaseTrack caseId={caseId} />

      <section className="pt-[clamp(32px,calc(var(--cqi)*5),72px)] pb-[clamp(32px,calc(var(--cqi)*4),56px)]">
        <Container>
          <Link
            href={r.clientStories}
            className="mb-8 inline-flex min-h-10 items-center gap-2 text-[15px] text-body transition-colors hover:text-ink"
          >
            <ArrowLeftIcon className="text-[14px]" />
            {t.back}
          </Link>
          <div className="grid items-center gap-x-[clamp(28px,calc(var(--cqi)*5),80px)] gap-y-8 min-[861px]:grid-cols-2">
            <div>
              <Eyebrow className="mb-4">
                {`${pick(c.client, locale)} · ${pick(c.sector, locale)}`}
              </Eyebrow>
              <h1 className="t-h1">
                {story.lead} <span className="text-faint">{story.tail}</span>
              </h1>
              <p className="t-lead mt-6 max-w-[520px] text-body">{story.intro}</p>
            </div>
            <Media variant={c.media} className="aspect-[4/3]" />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-[clamp(40px,calc(var(--cqi)*5),80px)]">
        <Container>
          <div className="grid gap-10 min-[761px]:grid-cols-2 min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
            <div>
              <Eyebrow>{t.result}</Eyebrow>
              {caseId === "sonnedix" ? (
                <>
                  <h2 className="t-h2b mt-5">{t.sonnedix.resultTitle}</h2>
                  <p className="mt-4 text-[17px] text-body">{t.sonnedix.resultSub}</p>
                  <Traceability story={t.sonnedix} />
                </>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-x-12 gap-y-6">
                  {c.metrics?.map((m) => (
                    <li key={m.value}>
                      <b className="t-stat font-semibold max-[400px]:!text-[46px]">{m.value}</b>
                      <p className="mt-2 text-[16px] text-body">{pick(m.label, locale)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <KeyValueList
              labelStyle="mono"
              rows={[
                ...story.rows,
                {
                  label: t.formatLabel,
                  value: (
                    <Link
                      href={formatHref}
                      className="inline-flex items-center gap-2 border-b border-line-strong text-ink hover:border-brand"
                    >
                      {c.format} <ArrowIcon className="text-[12px]" />
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="beams"
      />
    </>
  );
}

function Traceability({
  story,
}: {
  story: (typeof CONTENT)["en"]["sonnedix"] | (typeof CONTENT)["es"]["sonnedix"];
}) {
  return (
    <div className="mt-8 grid items-center gap-6 rounded-2xl border border-line-strong bg-card p-5 min-[561px]:grid-cols-[1fr_1fr]">
      <ul className="grid gap-2">
        {story.docs.map((d, i) => (
          <li
            key={d.name}
            className={cn(
              "rounded-xl border px-3.5 py-2.5",
              i === 1 ? "border-ink bg-card" : "border-line-strong opacity-55",
            )}
          >
            <p className="text-[14px] font-semibold text-ink">{d.name}</p>
            <p className="t-tag text-[11px] text-body">{d.ref}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-3">
        <span aria-hidden="true" className="mt-2 size-3 shrink-0 rounded-full bg-brand" />
        <div>
          <p className="text-[15px] font-semibold text-ink">{story.answer}</p>
          <p className="t-tag mt-2 text-[11px] text-brand">{story.source}</p>
        </div>
      </div>
    </div>
  );
}
