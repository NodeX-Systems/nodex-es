import CtaBanner from "@/components/ui/CtaBanner";
import KeyValueList from "@/components/ui/KeyValueList";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    lead: "Partners.",
    tail: "La tecnología sobre la que construimos.",
    intro:
      "Elegimos la tecnología según el contexto de cada cliente, no por una alianza. Estas son las plataformas con las que trabajamos.",
    title: "Tecnología que usamos en producción.",
    rows: [
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "FastAPI · Pydantic AI" },
      { label: "Modelos", value: "LiteLLM, para que puedas cambiar de proveedor de LLM sin reconstruir" },
      { label: "Datos", value: "pgvector" },
      { label: "Observabilidad", value: "OpenTelemetry" },
    ],
    ctaTitle: "Habla de tu proyecto con un ingeniero senior.",
  },
  en: {
    lead: "Partners.",
    tail: "The technology we build on.",
    intro:
      "We choose technology for each client’s context, not for a partnership. These are the platforms and partners we work with.",
    title: "Technology we use in production.",
    rows: [
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "FastAPI · Pydantic AI" },
      { label: "Models", value: "LiteLLM, so you can change LLM provider without rebuilding" },
      { label: "Data", value: "pgvector" },
      { label: "Observability", value: "OpenTelemetry" },
    ],
    ctaTitle: "Discuss your project with a senior engineer.",
  },
} as const;

export default function PartnersTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  return (
    <>
      <PageHero lead={t.lead} tail={t.tail} intro={t.intro} media={["beams", "portal", "scan"]} />
      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b max-w-[420px]">{t.title}</h2>
          <KeyValueList rows={t.rows} />
        </div>
      </Section>
      <CtaBanner title={t.ctaTitle} label={NAV_LABELS[locale].scopingCall} href={r.contact} variant="beams" />
    </>
  );
}
