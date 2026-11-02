import CtaBanner from "@/components/ui/CtaBanner";
import KeyValueList from "@/components/ui/KeyValueList";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/features";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    heroLead: "Seguridad y datos.",
    heroTail: "Cómo protegemos tus sistemas.",
    heroIntro:
      "Lo que suelen preguntar los equipos de seguridad, legal y compras antes de empezar.",
    questionnaire: "Envíanos tu cuestionario",
    flow: [
      { title: "Tus datos", text: "se quedan en tu entorno" },
      { title: "Agente de IA", text: "trabaja con acceso acotado" },
      { title: "Revisión humana", text: "aprueba antes de que nada escriba", accent: true },
      { title: "Producción", text: "trazada y monitorizada" },
    ],
    handleTitle: "Cómo tratamos tus sistemas.",
    rows: [
      { label: "NDA", value: "Un NDA estándar con cada cliente y proveedor, firmado antes de que veamos nada." },
      { label: "Tu entorno", value: "Trabajamos dentro de tu infraestructura, con tus controles de acceso y tu traza de auditoría." },
      { label: "Tus datos", value: "Tus datos siguen siendo tuyos. No los usamos para entrenar modelos ni para ningún otro cliente." },
      { label: "Elección de modelo", value: "Arquitecturas que no dependen de un solo proveedor de LLM, para que puedas cambiar de modelo sin reconstruir." },
      { label: "Revisión humana", value: "Guardrails y un paso de revisión antes de que la IA escriba en tus sistemas, con trazabilidad hasta la fuente." },
      { label: "RGPD", value: "Tratamos datos personales conforme al RGPD, con un contrato de encargado de tratamiento cuando haga falta." },
    ],
    certLabel: "Certificaciones",
    certValue: "Pendiente.",
    ctaTitle: "¿Preguntas sobre seguridad? Habla con nuestro equipo.",
  },
  en: {
    heroLead: "Security and data.",
    heroTail: "How we protect your systems.",
    heroIntro:
      "What your security, legal and procurement teams usually ask before we start.",
    questionnaire: "Send us your questionnaire",
    flow: [
      { title: "Your data", text: "stays in your environment" },
      { title: "AI agent", text: "works with scoped access" },
      { title: "Human review", text: "approves before anything writes", accent: true },
      { title: "Production", text: "traced and monitored" },
    ],
    handleTitle: "How we handle your systems.",
    rows: [
      { label: "NDA", value: "A standard NDA with every client and supplier, signed before we see anything." },
      { label: "Your environment", value: "We work inside your infrastructure, with your access controls and your audit trail." },
      { label: "Your data", value: "Your data stays yours. We don’t use it to train models or for any other client." },
      { label: "Model choice", value: "Architectures that don’t depend on one LLM provider, so you can change models without rebuilding." },
      { label: "Human review", value: "Guardrails and a review step before AI writes to your systems, with traceability to the source." },
      { label: "GDPR", value: "We process personal data under GDPR, with a data processing agreement when needed." },
    ],
    certLabel: "Certifications",
    certValue: "Pending.",
    ctaTitle: "Questions about security? Talk to our team.",
  },
} as const;

export default function SecurityTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const rows = FEATURES.securityCertifications
    ? [...t.rows, { label: t.certLabel, value: t.certValue }]
    : t.rows;

  return (
    <>
      <PageHero
        lead={t.heroLead}
        tail={t.heroTail}
        intro={t.heroIntro}
        cta={{
          href: `${r.contact}?format=security-questionnaire`,
          label: t.questionnaire,
          variant: "outline",
        }}
        media={["scan", "hole", "head"]}
      />

      {/* Data flow: your data -> agent -> human review -> production */}
      <Section className="py-[clamp(32px,calc(var(--cqi)*4),64px)] max-[700px]:py-8">
        <ol className="grid gap-6 rounded-2xl border border-line-strong bg-card p-[clamp(20px,calc(var(--cqi)*3),40px)] min-[701px]:grid-cols-4 min-[701px]:gap-0">
          {t.flow.map((n, i) => (
            <li key={n.title} className="relative flex items-center gap-4 min-[701px]:flex-col min-[701px]:text-center">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 size-3.5 shrink-0 rounded-full border bg-card",
                  "accent" in n && n.accent ? "border-brand bg-brand" : "border-line-strong",
                )}
              />
              <div className="min-[701px]:mt-3">
                <p className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink">
                  {n.title}
                </p>
                <p className="mt-1 text-[14px] text-body">{n.text}</p>
              </div>
              {i < t.flow.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-[7px] left-[calc(50%+14px)] hidden h-px w-[calc(100%-28px)] overflow-hidden bg-line-strong min-[701px]:block"
                >
                  <i className="absolute top-[-1px] size-[3px] animate-flow rounded-full bg-brand" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b max-w-[440px]">{t.handleTitle}</h2>
          <KeyValueList rows={rows} />
        </div>
      </Section>

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="beams"
      />
    </>
  );
}
