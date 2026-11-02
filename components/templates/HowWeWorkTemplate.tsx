import CtaBanner from "@/components/ui/CtaBanner";
import KeyValueList from "@/components/ui/KeyValueList";
import Media from "@/components/ui/Media";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import StepsTimeline from "@/components/templates/StepsTimeline";
import { NAV_LABELS, ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    heroLead: "Dentro de tu equipo",
    heroTail: "en una semana.",
    heroIntro:
      "Un proceso sencillo, llevado con criterio. El mismo ciclo para un ingeniero o para un equipo completo.",
    steps: [
      { when: "Llamada de alcance", title: "Entender", text: "Empezamos por tu negocio y el problema real, no por el briefing." },
      { when: "Día 1", title: "Definir", text: "Acordamos el enfoque técnico y las prioridades." },
      { when: "Semana 1", title: "Incorporarnos", text: "Entramos en tus herramientas, stand-ups y planificación, en menos de una semana." },
      { when: "Desde la semana 2", title: "Entregar", text: "Construimos y llevamos a producción al ritmo de entrega de tu equipo." },
      { when: "Después", title: "Escalar", text: "Estabilizamos y ampliamos lo construido, y luego lo traspasamos o nos quedamos para el siguiente paso." },
    ],
    wayTitle: "Trabajamos como ya trabaja tu equipo.",
    way: [
      { label: "Herramientas", value: "Entramos en las tuyas: Slack, Teams, Jira, Notion." },
      { label: "Rituales", value: "Stand-ups, revisiones de sprint y planificación." },
      { label: "Personas", value: "Línea directa con product owners y responsables de ingeniería." },
      { label: "Cadencia", value: "El ritmo de entrega de tu equipo, no un calendario propio." },
    ],
    twoLead: "Dos equipos.",
    twoTail: "Una forma de trabajar.",
    twoText:
      "Nuestros ingenieros han trabajado en banca, logística y salud, así que la curva de aprendizaje es corta. Buscamos una conexión real entre tu equipo y el nuestro, porque las personas trabajan mejor cuando están a gusto.",
    chips: ["Banca", "Logística", "Salud"],
    ctaTitle: "Habla de tu proyecto con un ingeniero senior.",
  },
  en: {
    heroLead: "Inside your team",
    heroTail: "in one week.",
    heroIntro:
      "A simple process, run with judgment. The same cycle for one engineer or a full team.",
    steps: [
      { when: "Scoping call", title: "Understand", text: "We start with your business and the real problem, not the brief." },
      { when: "Day 1", title: "Define", text: "We agree the technical approach and the priorities." },
      { when: "Week 1", title: "Onboard", text: "We join your tools, stand-ups and planning, within one week." },
      { when: "From week 2", title: "Ship", text: "We build and put it in production at your delivery cadence." },
      { when: "Then", title: "Scale", text: "We stabilise and extend it, then hand it over or stay for the next step." },
    ],
    wayTitle: "We work the way your team already works.",
    way: [
      { label: "Tools", value: "We join yours: Slack, Teams, Jira, Notion." },
      { label: "Rituals", value: "Stand-ups, sprint reviews and planning." },
      { label: "People", value: "A direct line to product owners and engineering leads." },
      { label: "Cadence", value: "Your delivery rhythm, not a calendar of our own." },
    ],
    twoLead: "Two teams.",
    twoTail: "One way of working.",
    twoText:
      "Our engineers have worked across banking, logistics and healthcare, so the learning curve is short. We look for a real connection between your team and ours, because people do their best work when they’re comfortable.",
    chips: ["Banking", "Logistics", "Healthcare"],
    ctaTitle: "Discuss your project with a senior engineer.",
  },
} as const;

export default function HowWeWorkTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const r = ROUTES[locale];
  const cta = NAV_LABELS[locale].scopingCall;

  return (
    <>
      <PageHero
        lead={t.heroLead}
        tail={t.heroTail}
        intro={t.heroIntro}
        cta={{ href: r.contact, label: cta }}
        media={["portal", "head", "hole"]}
      />

      <Section className="py-[clamp(32px,calc(var(--cqi)*4),64px)] max-[700px]:py-8">
        <StepsTimeline steps={t.steps} />
      </Section>

      <Section>
        <div className="grid gap-10 min-[761px]:grid-cols-[1fr_1.3fr] min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),72px)]">
          <h2 className="t-h2b max-w-[460px]">{t.wayTitle}</h2>
          <KeyValueList rows={t.way} />
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 min-[761px]:grid-cols-2 min-[761px]:gap-[clamp(32px,calc(var(--cqi)*5),80px)]">
          <Media variant="beams" className="aspect-[4/3]" />
          <div>
            <h2 className="t-h2b">
              {t.twoLead} <span className="text-faint">{t.twoTail}</span>
            </h2>
            <p className="t-lead mt-6 max-w-[480px] text-body">{t.twoText}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line-strong px-4 py-2 text-[15px] text-ink"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner title={t.ctaTitle} label={cta} href={r.contact} variant="tv" />
    </>
  );
}
