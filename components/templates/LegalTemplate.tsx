import CookiePrefsButton from "@/components/site/CookiePrefsButton";
import LegalNav from "@/components/templates/LegalNav";
import Container from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/lib/constants";
import type { Locale } from "@/lib/routes";

// Legal copy. Registry data and wording must be checked by legal counsel
// before launch (MVP brief, blocker 3).
const COMPANY = {
  name: "NODEX SYSTEMS S.L.",
  taxId: "B21901657",
  address: "Calle Ingeniero Joaquín Benlloch 85, Esc. 2, 7ª 27, 46026 Valencia",
};

const CONTENT = {
  en: {
    title: "Legal.",
    nav: [
      { id: "legal-notice", label: "Legal notice" },
      { id: "privacy", label: "Privacy policy" },
      { id: "cookies", label: "Cookie policy" },
      { id: "access", label: "Accessibility" },
    ],
    notice: {
      title: "Legal notice",
      intro: `This website is owned by ${COMPANY.name}, tax ID ${COMPANY.taxId}, with registered office at ${COMPANY.address}, Spain, registered in the Mercantile Register of Valencia. Contact: ${CONTACT_EMAIL}.`,
      blocks: [
        ["Use of the site", "By using this site you agree to use it lawfully and not to damage it or interfere with its operation."],
        ["Intellectual property", "The content, design and code of this site belong to Nodex or are used with permission. Client logos are shown with their approval and belong to their owners."],
        ["Liability", "We keep the information on this site accurate and up to date, but we are not liable for decisions taken solely on the basis of it."],
        ["Applicable law", "Spanish law applies. Any dispute will be handled by the courts of Valencia, unless the law provides otherwise."],
      ],
    },
    privacy: {
      title: "Privacy policy",
      responsibleTitle: "Who is responsible",
      responsible: `${COMPANY.name} (details above). Contact for privacy matters: ${CONTACT_EMAIL}.`,
      collectTitle: "What we collect and why",
      collect: [
        ["Scoping call form and Contact", "name, work email, company, company size, phone (optional), how you heard about us and your message, to answer your request. Legal basis: your consent and the steps prior to a contract."],
        ["Careers form", "your answers, email and links, and the CV if you attach one, to consider you for a role. Legal basis: steps prior to a possible employment contract, at your request, and your consent."],
        ["Analytics", "only if you accept analytics cookies. Legal basis: your consent."],
      ],
      keepTitle: "How long we keep it",
      keep: "Requests: 12 months. Applications: until the process ends and 12 months afterwards, unless you ask us to delete them earlier.",
      shareTitle: "Who we share it with",
      share: "Only with providers that help us run this site and our email (hosting and email providers), under a data processing agreement. We don’t sell your data.",
      rightsTitle: "Your rights",
      rights: `You can delete your application at any time by writing to ${CONTACT_EMAIL}. You can access, correct or delete your data, object to it or restrict its use, and ask for a copy, by writing to ${CONTACT_EMAIL}. You can also complain to the Spanish Data Protection Agency (AEPD).`,
    },
    cookies: {
      title: "Cookie policy",
      intro: "We use essential cookies to run this site. Analytics cookies are only set if you accept them.",
      head: ["Cookie", "Type", "Purpose", "Duration"],
      rows: [
        ["nx_consent", "Essential", "Remembers your cookie choice", "12 months"],
        ["_ga (Google Analytics)", "Analytics", "Measures how the site is used", "2 years"],
      ],
      settings: "Cookie settings",
    },
    access: {
      title: "Accessibility statement",
      intro: "We want this website to be usable by everyone. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.",
      statusTitle: "Compliance status",
      status: "Partially conforming. We are reviewing the whole site against WCAG 2.2 AA.",
      doneTitle: "What we have done",
      done: [
        "Every page works with a keyboard, with a visible focus.",
        "Images have text alternatives, or are marked as decorative.",
        "Animations stop if your device asks for reduced motion.",
        "Text and controls meet the contrast and touch-size guidelines.",
      ],
      limitsTitle: "Known limitations",
      limits: "None known at the moment. If you find one, please tell us.",
      feedbackTitle: "Feedback",
      feedback: `If you find a barrier, write to ${CONTACT_EMAIL}. We reply within 10 working days.`,
      dateTitle: "Date",
      date: "Prepared in April 2025. Last reviewed on 23 September 2026.",
    },
    updated: "Last updated: 30 October 2026",
  },
  es: {
    title: "Legal.",
    nav: [
      { id: "legal-notice", label: "Aviso legal" },
      { id: "privacy", label: "Política de privacidad" },
      { id: "cookies", label: "Política de cookies" },
      { id: "access", label: "Accesibilidad" },
    ],
    notice: {
      title: "Aviso legal",
      intro: `Este sitio web es titularidad de ${COMPANY.name}, NIF ${COMPANY.taxId}, con domicilio social en ${COMPANY.address}, España, inscrita en el Registro Mercantil de Valencia. Contacto: ${CONTACT_EMAIL}.`,
      blocks: [
        ["Uso del sitio", "Al usar este sitio aceptas hacerlo de forma lícita y no dañarlo ni interferir en su funcionamiento."],
        ["Propiedad intelectual", "El contenido, el diseño y el código de este sitio pertenecen a Nodex o se usan con permiso. Los logotipos de clientes se muestran con su aprobación y pertenecen a sus titulares."],
        ["Responsabilidad", "Mantenemos la información de este sitio exacta y actualizada, pero no respondemos de las decisiones tomadas únicamente en base a ella."],
        ["Legislación aplicable", "Se aplica la legislación española. Cualquier controversia se someterá a los juzgados de Valencia, salvo que la ley disponga otra cosa."],
      ],
    },
    privacy: {
      title: "Política de privacidad",
      responsibleTitle: "Responsable",
      responsible: `${COMPANY.name} (datos arriba). Contacto para asuntos de privacidad: ${CONTACT_EMAIL}.`,
      collectTitle: "Qué recogemos y para qué",
      collect: [
        ["Formulario de llamada de alcance y Contacto", "nombre, email de trabajo, empresa, tamaño de la empresa, teléfono (opcional), cómo nos conociste y tu mensaje, para responder a tu solicitud. Base jurídica: tu consentimiento y las medidas previas a un contrato."],
        ["Formulario de Carreras", "tus respuestas, email y enlaces, y el CV si lo adjuntas, para valorarte para un puesto. Base jurídica: medidas previas a un posible contrato laboral, a petición tuya, y tu consentimiento."],
        ["Analítica", "solo si aceptas las cookies de analítica. Base jurídica: tu consentimiento."],
      ],
      keepTitle: "Cuánto tiempo lo conservamos",
      keep: "Solicitudes: 12 meses. Candidaturas: hasta que termine el proceso y 12 meses después, salvo que nos pidas borrarlas antes.",
      shareTitle: "Con quién lo compartimos",
      share: "Solo con proveedores que nos ayudan a operar este sitio y nuestro email (proveedores de alojamiento y correo), bajo un contrato de encargado de tratamiento. No vendemos tus datos.",
      rightsTitle: "Tus derechos",
      rights: `Puedes borrar tu candidatura en cualquier momento escribiendo a ${CONTACT_EMAIL}. Puedes acceder a tus datos, rectificarlos o suprimirlos, oponerte a su tratamiento o limitarlo, y pedir una copia, escribiendo a ${CONTACT_EMAIL}. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).`,
    },
    cookies: {
      title: "Política de cookies",
      intro: "Usamos cookies esenciales para que el sitio funcione. Las cookies de analítica solo se activan si las aceptas.",
      head: ["Cookie", "Tipo", "Finalidad", "Duración"],
      rows: [
        ["nx_consent", "Esencial", "Recuerda tu elección de cookies", "12 meses"],
        ["_ga (Google Analytics)", "Analítica", "Mide cómo se usa el sitio", "2 años"],
      ],
      settings: "Ajustes de cookies",
    },
    access: {
      title: "Declaración de accesibilidad",
      intro: "Queremos que este sitio web pueda usarlo todo el mundo. Aspiramos a cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 en nivel AA.",
      statusTitle: "Estado de conformidad",
      status: "Parcialmente conforme. Estamos revisando todo el sitio frente a WCAG 2.2 AA.",
      doneTitle: "Qué hemos hecho",
      done: [
        "Todas las páginas funcionan con teclado, con un foco visible.",
        "Las imágenes tienen alternativas de texto o están marcadas como decorativas.",
        "Las animaciones se detienen si tu dispositivo pide reducir el movimiento.",
        "El texto y los controles cumplen las pautas de contraste y tamaño táctil.",
      ],
      limitsTitle: "Limitaciones conocidas",
      limits: "Ninguna conocida por ahora. Si encuentras alguna, cuéntanoslo.",
      feedbackTitle: "Comentarios",
      feedback: `Si encuentras una barrera, escribe a ${CONTACT_EMAIL}. Respondemos en 10 días laborables.`,
      dateTitle: "Fecha",
      date: "Elaborada en abril de 2025. Última revisión el 23 de septiembre de 2026.",
    },
    updated: "Última actualización: 30 de octubre de 2026",
  },
} as const;

const h3 = "mt-7 mb-1.5 text-[17px] font-semibold text-ink";
const p = "text-[16px] leading-[1.6] text-body";

export default function LegalTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <>
      <section className="pt-[clamp(40px,calc(var(--cqi)*6),96px)] pb-[clamp(16px,calc(var(--cqi)*2),32px)] max-[700px]:pt-10 max-[700px]:pb-4">
        <Container>
          <h1 className="t-h1">{t.title}</h1>
        </Container>
      </section>

      <section className="pb-[clamp(48px,calc(var(--cqi)*6),96px)]">
        <Container>
          <div className="grid gap-x-[clamp(32px,calc(var(--cqi)*5),80px)] gap-y-6 min-[761px]:grid-cols-[200px_minmax(0,720px)]">
            <LegalNav items={t.nav} />

            <div>
              <section id="legal-notice" className="scroll-mt-24 border-b border-line pb-10">
                <h2 className="t-h2-legal">{t.notice.title}</h2>
                <p className={`${p} mt-4`}>{t.notice.intro}</p>
                {t.notice.blocks.map(([title, text]) => (
                  <div key={title}>
                    <h3 className={h3}>{title}</h3>
                    <p className={p}>{text}</p>
                  </div>
                ))}
              </section>

              <section id="privacy" className="scroll-mt-24 border-b border-line py-10">
                <h2 className="t-h2-legal">{t.privacy.title}</h2>
                <h3 className={h3}>{t.privacy.responsibleTitle}</h3>
                <p className={p}>{t.privacy.responsible}</p>
                <h3 className={h3}>{t.privacy.collectTitle}</h3>
                <ul className="list-disc space-y-2 pl-5">
                  {t.privacy.collect.map(([title, text]) => (
                    <li key={title} className={p}>
                      <b className="font-semibold text-ink">{title}:</b> {text}
                    </li>
                  ))}
                </ul>
                <h3 className={h3}>{t.privacy.keepTitle}</h3>
                <p className={p}>{t.privacy.keep}</p>
                <h3 className={h3}>{t.privacy.shareTitle}</h3>
                <p className={p}>{t.privacy.share}</p>
                <h3 className={h3}>{t.privacy.rightsTitle}</h3>
                <p className={p}>{t.privacy.rights}</p>
              </section>

              <section id="cookies" className="scroll-mt-24 border-b border-line py-10">
                <h2 className="t-h2-legal">{t.cookies.title}</h2>
                <p className={`${p} mt-4`}>{t.cookies.intro}</p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-line-strong bg-card">
                  <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-line">
                        {t.cookies.head.map((c) => (
                          <th key={c} scope="col" className="t-tag px-4 py-3 text-body">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.cookies.rows.map((row) => (
                        <tr key={row[0]} className="border-b border-line last:border-b-0">
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3 text-body">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CookiePrefsButton className="mt-5 inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas">
                  {t.cookies.settings}
                </CookiePrefsButton>
              </section>

              <section id="access" className="scroll-mt-24 py-10">
                <h2 className="t-h2-legal">{t.access.title}</h2>
                <p className={`${p} mt-4`}>{t.access.intro}</p>
                <h3 className={h3}>{t.access.statusTitle}</h3>
                <p className={p}>{t.access.status}</p>
                <h3 className={h3}>{t.access.doneTitle}</h3>
                <ul className="list-disc space-y-2 pl-5">
                  {t.access.done.map((d) => (
                    <li key={d} className={p}>
                      {d}
                    </li>
                  ))}
                </ul>
                <h3 className={h3}>{t.access.limitsTitle}</h3>
                <p className={p}>{t.access.limits}</p>
                <h3 className={h3}>{t.access.feedbackTitle}</h3>
                <p className={p}>{t.access.feedback}</p>
                <h3 className={h3}>{t.access.dateTitle}</h3>
                <p className={p}>{t.access.date}</p>
                <p className="t-tag mt-10 border-t border-line pt-5 text-[11px] text-faint">
                  {t.updated}
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
