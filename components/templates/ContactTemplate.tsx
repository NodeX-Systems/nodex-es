import ContactWizard from "@/components/forms/ContactWizard";
import LogoStrip from "@/components/home/LogoStrip";
import Container from "@/components/ui/Container";
import { TickIcon } from "@/components/ui/icons";
import Media from "@/components/ui/Media";
import type { Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    lead: "Solicita una llamada de alcance.",
    tail: "30 minutos con un ingeniero senior.",
    sub: "Cuéntanos el problema. En 30 minutos te decimos con honestidad si somos el equipo adecuado y cómo empezaríamos.",
    subShort: "Cuéntanos el problema. En 30 minutos te decimos si somos el equipo adecuado.",
    checks: [
      "Una llamada con nuestros especialistas, sobre tu problema",
      "Un primer enfoque y un sí o un no honesto",
      "Sin compromiso, sin pago",
    ],
    logos: "Empresas que ya trabajan con nosotros",
  },
  en: {
    lead: "Request a scoping call.",
    tail: "30 minutes with a senior engineer.",
    sub: "Tell us the problem. In 30 minutes we tell you honestly whether we’re the right team, and how we would start.",
    subShort: "Tell us the problem. In 30 minutes we tell you if we’re the right team.",
    checks: [
      "A call with our specialists, about your problem",
      "A first approach and an honest yes or no",
      "No commitment, no payment",
    ],
    logos: "Companies that already work with us",
  },
} as const;

export default function ContactTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <section className="pt-[clamp(32px,calc(var(--cqi)*4),64px)] pb-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:pt-[18px] max-[700px]:pb-12">
      <Container>
        <div className="grid items-start gap-x-[clamp(28px,calc(var(--cqi)*5),80px)] gap-y-8 min-[901px]:grid-cols-[0.95fr_1.05fr] min-[901px]:grid-rows-[auto_1fr]">
          <div className="min-[901px]:col-start-1 min-[901px]:row-start-1">
            <h1 className="t-h1-contact">
              {t.lead} <span className="text-faint">{t.tail}</span>
            </h1>
            <p className="t-sub mt-5 max-w-[460px] max-[700px]:hidden">{t.sub}</p>
            <p className="t-sub mt-4 hidden max-w-[460px] max-[700px]:block">{t.subShort}</p>
          </div>

          {/* Mobile order: title, subtitle, form, checklist (DOM order). */}
          <div className="min-[901px]:col-start-2 min-[901px]:row-span-2 min-[901px]:row-start-1">
            <ContactPanel locale={locale} />
          </div>

          <ul className="max-[900px]:order-3 min-[901px]:col-start-1 min-[901px]:row-start-2">
            {t.checks.map((c) => (
              <li key={c} className="flex items-start gap-3 py-1.5 text-[17px] text-ink">
                <TickIcon className="mt-1 shrink-0 text-[18px] text-brand" />
                {c}
              </li>
            ))}
          </ul>

          <div className="border-t border-line pt-8 max-[900px]:order-2 min-[901px]:col-span-2 min-[901px]:row-start-3 min-[901px]:mt-[clamp(8px,calc(var(--cqi)*2),32px)]">
            <LogoStrip label={t.logos} />
          </div>
        </div>
      </Container>
    </section>
  );
}

// Frame with an image behind the form on desktop; plain panel up to 900px.
function ContactPanel({ locale }: { locale: Locale }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[20px] p-[clamp(20px,calc(var(--cqi)*3),40px)] max-[900px]:p-0">
      <Media
        variant="beams"
        className="absolute inset-0 -z-10 rounded-none max-[900px]:hidden"
      />
      <ContactWizard locale={locale} />
    </div>
  );
}
