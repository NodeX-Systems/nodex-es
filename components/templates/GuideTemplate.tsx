import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import CtaBanner from "@/components/ui/CtaBanner";
import KeyValueList from "@/components/ui/KeyValueList";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { NAV_LABELS, ROUTES, type Locale, type RouteKey } from "@/lib/routes";

const CONTENT = {
  es: {
    label: "GUÍA",
    lead: "¿Qué es Forward Deployed Engineering?",
    tail: "Una guía breve.",
    intro:
      "Los Forward Deployed Engineers son ingenieros senior que se integran en tu equipo, trabajan en tu stack y bajo tus reglas, y se quedan hasta que lo que construyen funciona en producción.",
    author: "Iván Ruiz, Founder & CTO · 6 min de lectura",
    shortTitle: "La respuesta corta.",
    short: [
      { label: "Dónde", value: "Dentro de tu equipo: tus herramientas, tus stand-ups, tu planificación." },
      { label: "Qué", value: "Se responsabilizan del resultado, no de las horas: un sistema funcionando en producción." },
      { label: "Cómo", value: "Empiezan por el problema, no por el briefing, y siguen con las manos en el código." },
      { label: "Tuyo", value: "El código, la documentación y la infraestructura, desde el primer día." },
    ],
    compareTitle: "Cómo se compara.",
    cols: ["Consultoría", "Desarrollo externalizado", "Forward Deployed Engineers"],
    compare: [
      { label: "Dónde ocurre el trabajo", values: ["Talleres e informes", "En el equipo del proveedor", "Dentro de tu equipo"] },
      { label: "Qué recibes", values: ["Recomendaciones", "Código hecho a una especificación", "Un sistema funcionando en producción"] },
      { label: "Quién encuentra el problema", values: ["Tú, antes de contratar", "Tú, en la especificación", "Los ingenieros, contigo"] },
      { label: "Cuándo termina", values: ["Cuando se entrega el informe", "Cuando se cumple la especificación", "Cuando funciona y tú decides"] },
    ],
    fitsTitle: "Cuándo encaja.",
    fits: [
      { label: "Capacidad senior", text: "Tu equipo necesita ingenieros que trabajen como los suyos.", link: "Embed", route: "svcEmbed" },
      { label: "Un producto nuevo", text: "Lo necesitas construido de extremo a extremo.", link: "Build", route: "svcBuild" },
      { label: "Un proyecto que se retrasó", text: "Los plazos se mueven o los costes crecen.", link: "Unblock", route: "svcUnblock" },
      { label: "Un caso de uso de IA", text: "Lo tienes claro y necesitas que funcione, no otro piloto.", link: "Ship AI", route: "svcShipAi" },
    ],
    faqTitle: "Preguntas frecuentes.",
    faq: [
      { q: "¿Es lo mismo que consultoría?", a: "No. Una consultoría entrega recomendaciones; un Forward Deployed Engineer construye y se queda hasta que el sistema funciona en producción." },
      { q: "¿Sustituyen a mi equipo?", a: "No. Trabajan dentro de tu equipo, con tus herramientas y tu cadencia, y lo que construyen queda en manos de tu equipo." },
      { q: "¿Es solo para IA?", a: "No. La IA es hoy la mayor parte de nuestro trabajo, pero el modelo sirve para cualquier sistema que tenga que funcionar en producción." },
      { q: "¿Cómo lo hace Nodex?", a: "Empezamos por entender el problema, nos incorporamos a tu equipo en una semana y entregamos al ritmo del tuyo. Lo explicamos en Cómo trabajamos." },
    ],
    ctaTitle: "Habla de tu proyecto con un ingeniero senior.",
  },
  en: {
    label: "GUIDE",
    lead: "What is Forward Deployed Engineering?",
    tail: "A short guide.",
    intro:
      "Forward Deployed Engineers are senior engineers who join your team, work in your stack and under your rules, and stay until what they build runs in production.",
    author: "Iván Ruiz, Founder & CTO · 6 min read",
    shortTitle: "The short answer.",
    short: [
      { label: "Where", value: "Inside your team: your tools, your stand-ups, your planning." },
      { label: "What", value: "They own the outcome, not the hours: a system running in production." },
      { label: "How", value: "They start from the problem, not the brief, and stay hands-on, writing code." },
      { label: "Yours", value: "The code, the documentation and the infrastructure, from day one." },
    ],
    compareTitle: "How it compares.",
    cols: ["Consultancy", "Outsourced development", "Forward Deployed Engineers"],
    compare: [
      { label: "Where the work happens", values: ["Workshops and reports", "In the provider’s team", "Inside your team"] },
      { label: "What you get", values: ["Recommendations", "Code built to a spec", "A system running in production"] },
      { label: "Who finds the problem", values: ["You, before hiring", "You, in the spec", "The engineers, with you"] },
      { label: "When it ends", values: ["When the report is delivered", "When the spec is met", "When it works, and you decide"] },
    ],
    fitsTitle: "When it fits.",
    fits: [
      { label: "Senior capacity", text: "Your team needs engineers who work like their own.", link: "Embed", route: "svcEmbed" },
      { label: "A new product", text: "You need it built end to end.", link: "Build", route: "svcBuild" },
      { label: "A project that slipped", text: "Deadlines keep moving or costs keep growing.", link: "Unblock", route: "svcUnblock" },
      { label: "An AI use case", text: "You know what it is and need it running, not another pilot.", link: "Ship AI", route: "svcShipAi" },
    ],
    faqTitle: "Common questions.",
    faq: [
      { q: "Is it the same as consulting?", a: "No. A consultancy delivers recommendations; a Forward Deployed Engineer builds, and stays until the system runs in production." },
      { q: "Do they replace my team?", a: "No. They work inside your team, with your tools and your cadence, and what they build stays in your team’s hands." },
      { q: "Is it only for AI?", a: "No. AI is most of our work today, but the model fits any system that has to run in production." },
      { q: "How does Nodex do it?", a: "We start by understanding the problem, join your team within a week and ship at your pace. It’s laid out in How we work." },
    ],
    ctaTitle: "Discuss your project with a senior engineer.",
  },
} as const;

export default function GuideTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];

  return (
    <>
      <PageHero
        eyebrow={t.label}
        lead={t.lead}
        tail={t.tail}
        intro={t.intro}
        media={["cyborg", "scan", "map"]}
      />
      <p className="t-tag -mt-6 mb-10 px-[var(--hpad)] text-body min-[1361px]:px-[calc((100vw-1280px)/2)]">
        <span className="mx-auto block max-w-[1280px] min-[1361px]:px-0">{t.author}</span>
      </p>

      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b">{t.shortTitle}</h2>
          <KeyValueList rows={t.short} />
        </div>
      </Section>

      <Section>
        <h2 className="t-h2b mb-10">{t.compareTitle}</h2>
        {/* Table at >760px; stacked rows below */}
        <div className="max-[760px]:hidden">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-t border-line">
                <th scope="col" className="w-1/4 py-4" />
                {t.cols.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={cn(
                      "t-tag py-4 pr-4",
                      i === 2 ? "text-brand" : "text-body",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.compare.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="py-4 pr-4 text-[16px] font-semibold text-ink">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={v}
                      className={cn(
                        "py-4 pr-4 text-[16px]",
                        i === 2 ? "font-medium text-ink" : "text-body",
                      )}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hidden max-[760px]:block">
          {t.compare.map((row) => (
            <dl key={row.label} className="border-t border-line py-5">
              <dt className="mb-3 text-[17px] font-semibold text-ink">{row.label}</dt>
              {row.values.map((v, i) => (
                <div key={v} className="flex gap-3 py-1 text-[15px]">
                  <dd className="t-tag w-[110px] shrink-0 pt-0.5 text-[10px] text-body">
                    {t.cols[i]}
                  </dd>
                  <dd className={i === 2 ? "font-medium text-ink" : "text-body"}>{v}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b">{t.fitsTitle}</h2>
          <ul className="border-t border-line">
            {t.fits.map((f) => (
              <li
                key={f.label}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(120px,200px)_1fr] sm:gap-8"
              >
                <span className="t-tag pt-1 text-body">{f.label}</span>
                <span className="text-[17px] leading-[1.5] text-body">
                  {f.text}{" "}
                  <Link
                    href={r[f.route as RouteKey]}
                    className="whitespace-nowrap border-b border-line-strong font-medium text-ink hover:border-brand"
                  >
                    {f.link} →
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.4fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b">{t.faqTitle}</h2>
          <Accordion items={t.faq.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </Section>

      <CtaBanner
        title={t.ctaTitle}
        label={NAV_LABELS[locale].scopingCall}
        href={r.contact}
        variant="glitch"
      />
    </>
  );
}
