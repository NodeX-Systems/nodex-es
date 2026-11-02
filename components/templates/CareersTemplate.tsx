import CareersForm from "@/components/forms/CareersForm";
import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { CONTACT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    lead: "Construye donde",
    tail: "está el problema.",
    questions: "Preguntas",
    faq: [
      { q: "¿Dónde contratáis?", a: "Estamos en Valencia y trabajamos en remoto o presencial con los equipos de nuestros clientes. Cuéntanos dónde estás y lo vemos." },
      { q: "¿Necesito un CV?", a: "No. El formulario te hace unas pocas preguntas y te pide un enlace (LinkedIn, GitHub o portfolio). Puedes adjuntar un CV si quieres." },
      { q: "¿Puedo borrar mi candidatura?", a: `Sí. Escribe a ${CONTACT_EMAIL} cuando quieras y la borramos.` },
    ],
  },
  en: {
    lead: "Build where",
    tail: "the problem is.",
    questions: "Questions",
    faq: [
      { q: "Where do you hire?", a: "We’re based in Valencia, Spain, and work remotely or on site with our clients’ teams. Tell us where you are and we’ll take it from there." },
      { q: "Do I need a CV?", a: "No. The form asks a few questions and a link (LinkedIn, GitHub or portfolio). You can attach a CV if you want." },
      { q: "Can I delete my application?", a: `Yes. Write to ${CONTACT_EMAIL} at any time and we’ll delete it.` },
    ],
  },
} as const;

export default function CareersTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const items = t.faq.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <section className="py-[clamp(32px,calc(var(--cqi)*5),64px)] pb-[clamp(48px,calc(var(--cqi)*6),96px)] max-[700px]:pt-8">
      <Container>
        <h1 className="t-h1 max-w-[900px]">
          {t.lead} <span className="text-faint">{t.tail}</span>
        </h1>

        <div className="mt-[clamp(32px,calc(var(--cqi)*4),64px)] grid items-start gap-x-[clamp(32px,calc(var(--cqi)*5),80px)] gap-y-10 min-[901px]:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
          <div className="max-w-[640px]">
            <CareersForm locale={locale} />
          </div>

          <aside className="max-[900px]:order-first">
            <Eyebrow className="mb-4">{t.questions}</Eyebrow>
            <Accordion items={items} />
          </aside>
        </div>
      </Container>
    </section>
  );
}
