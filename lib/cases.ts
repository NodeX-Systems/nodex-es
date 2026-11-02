import type { MediaVariant } from "@/components/ui/Media";
import type { PageKey, Locale } from "@/lib/routes";

// Client work shown on the home carousel, the client-stories list, the
// industries page and the press page. Only cases with a `route` have their
// own page; the rest render as plain cards.

export type Format = "Ship AI" | "Embed" | "Build" | "Unblock";

type Localised = { es: string; en: string };

export type Case = {
  id: "sonnedix" | "saas" | "distributed" | "vestel" | "repsol" | "bbva";
  client: Localised;
  sector: Localised;
  format: Format;
  title: Localised;
  summary?: Localised;
  metrics?: readonly { value: string; label: Localised }[];
  media: MediaVariant;
  route?: PageKey;
};

export const CASES: readonly Case[] = [
  {
    id: "sonnedix",
    client: { es: "Sonnedix", en: "Sonnedix" },
    sector: { es: "Energía renovable", en: "Renewable energy" },
    format: "Ship AI",
    title: {
      es: "Una capa de datos para todos los departamentos, con pipelines RAG y agentes con guardrails encima.",
      en: "One data layer for every department, with RAG pipelines and agents with guardrails on top.",
    },
    summary: {
      es: "Trazabilidad completa del documento de origen a la respuesta, y una arquitectura que no depende de un solo proveedor de LLM.",
      en: "Full traceability from source document to answer, and an architecture that doesn't depend on one LLM provider.",
    },
    media: "glitch",
    route: "caseSonnedix",
  },
  {
    id: "saas",
    client: { es: "Confidencial", en: "Confidential" },
    sector: { es: "Plataforma SaaS", en: "SaaS platform" },
    format: "Unblock",
    title: {
      es: "Una plataforma que carga más rápido y cuesta menos de operar.",
      en: "A platform that loaded faster and cost less to run.",
    },
    metrics: [
      { value: "+40%", label: { es: "rendimiento de carga", en: "load performance" } },
      { value: "−30%", label: { es: "coste cloud", en: "cloud cost" } },
    ],
    media: "portal",
    route: "caseSaas",
  },
  {
    id: "distributed",
    client: { es: "Confidencial", en: "Confidential" },
    sector: { es: "Sistemas distribuidos", en: "Distributed systems" },
    format: "Ship AI",
    title: {
      es: "Una plataforma orientada a eventos donde los agentes de IA leen los logs, escriben la documentación y ayudan a depurar.",
      en: "An event-driven platform where AI agents read the logs, write the docs and help debug.",
    },
    media: "scan",
  },
  {
    id: "vestel",
    client: { es: "Vestel Ingenieros", en: "Vestel Ingenieros" },
    sector: { es: "Industria", en: "Industry" },
    format: "Ship AI",
    title: {
      es: "Reporting que dejó de colapsar y modelos predictivos de coste y carga del equipo.",
      en: "Reporting that stopped collapsing, and predictive models on cost and team load.",
    },
    media: "map",
  },
  {
    id: "repsol",
    client: { es: "Guía Repsol, con Econocom", en: "Guía Repsol, with Econocom" },
    sector: { es: "Energía", en: "Energy" },
    format: "Build",
    title: {
      es: "Una arquitectura para la app de consumo, el portal de hostelería y el back office.",
      en: "One architecture for the consumer app, the hospitality portal and the back office.",
    },
    summary: {
      es: "En producción para negocios de hostelería en toda España.",
      en: "In production for hospitality businesses across Spain.",
    },
    media: "globe",
  },
  {
    id: "bbva",
    client: { es: "BBVA", en: "BBVA" },
    sector: { es: "Banca", en: "Banking" },
    format: "Embed",
    title: {
      es: "Integraciones de APIs de pago validadas de extremo a extremo, con los flujos críticos probados.",
      en: "Payment API integrations validated end to end, with the critical flows tested.",
    },
    media: "beams",
  },
];

export function getCase(id: Case["id"]) {
  return CASES.find((c) => c.id === id)!;
}

export function pick(value: Localised, locale: Locale) {
  return value[locale];
}
