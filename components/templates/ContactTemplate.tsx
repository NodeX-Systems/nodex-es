import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import LeadForm from "@/components/forms/LeadForm";
import ContactSection, {
  fieldColClass,
  formRowClass,
  halfFieldColClass,
  inputClass,
  submitColClass,
} from "@/components/pages/ContactSection";
import PageHero from "@/components/ui/PageHero";
import { FORM_ENDPOINTS } from "@/lib/constants";
import { ROUTES, type Locale } from "@/lib/routes";

const CONTENT = {
  es: {
    h1: "Contáctanos",
    homeLabel: "Inicio",
    breadcrumbCurrent: "Contacto",
    span: "Contáctanos",
    h2: "Ponte en Contacto. Empecemos a Construir.",
    intro:
      "Si necesitas acelerar el desarrollo, desbloquear un proyecto o reforzar tu equipo con perfiles senior, estamos listos para integrarnos y empezar a ejecutar contigo.",
    h3: "Envíanos un Mensaje",
    formIntro:
      "No dudes en contactarnos con cualquier pregunta o consulta. Nuestro equipo está aquí para ayudarte.",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Email",
    phonePlaceholder: "Teléfono",
    messagePlaceholder: "Mensaje",
    submitLabel: "Enviar",
  },
  en: {
    h1: "Contact Us",
    homeLabel: "Home",
    breadcrumbCurrent: "Contact",
    span: "Contact Us",
    h2: "Get in Touch. Let's Start Building.",
    intro:
      "If you need to accelerate development, unblock a project, or reinforce your team with senior profiles, we're ready to embed and start executing with you.",
    h3: "Send us a Message",
    formIntro:
      "Feel free to reach out to us with any questions or inquiries you may have. Our experienced team is here to assist you.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    messagePlaceholder: "Message",
    submitLabel: "Submit Now",
  },
} as const;

export default function ContactTemplate({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];

  return (
    <>
      <Header locale={locale} />
      <MobileNav locale={locale} />

      {/* HERO AREA */}
      <PageHero
        title={t.h1}
        homeHref={ROUTES[locale].home}
        homeLabel={t.homeLabel}
        current={t.breadcrumbCurrent}
      />

      {/* CONTACT AREA */}
      <ContactSection
        eyebrow={t.span}
        title={t.h2}
        intro={t.intro}
        formTitle={t.h3}
        formIntro={t.formIntro}
      >
        <LeadForm
          kind="contact"
          endpoint={FORM_ENDPOINTS.contact}
          locale={locale}
          submitLabel={t.submitLabel}
          className={formRowClass}
          submitWrapperClassName={submitColClass}
        >
          <div className={fieldColClass}>
            <input
              type="text"
              name="name"
              placeholder={t.namePlaceholder}
              required
              className={inputClass}
            />
          </div>

          <div className={halfFieldColClass}>
            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              required
              className={inputClass}
            />
          </div>

          <div className={halfFieldColClass}>
            <input
              type="number"
              name="phone"
              placeholder={t.phonePlaceholder}
              className={inputClass}
            />
          </div>

          <div className={fieldColClass}>
            <textarea
              name="message"
              rows={4}
              placeholder={t.messagePlaceholder}
              className={inputClass}
            ></textarea>
          </div>
        </LeadForm>
      </ContactSection>

      <Footer locale={locale} copyrightVariant="normal" />
    </>
  );
}
